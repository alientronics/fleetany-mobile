'use strict';

import {Injectable, Inject} from 'angular2/core';
import {Storage, Platform, LocalStorage, Events, NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {UserData} from './user-data';

var JSZip = require("jszip");

@Injectable()
export class GpsProvider {

  public storage: Storage;
  private gpstracking: boolean;
  private latitude: number;
  private longitude: number;
  public watcher: any;
  public userData: UserData;
  private GPS_DATA: string;
  private GPS_CURRENT_DATA: string;

  constructor(
      @Inject(Events) public events: Events,
      @Inject(Platform) public platform: Platform,
      @Inject(NavController) public nav: NavController,
      userData: UserData
  ) {
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.platform = platform;
    this.userData = userData;
    this.GPS_DATA = 'gpsdata';
    this.GPS_CURRENT_DATA = 'gpscurrentdata';
    this.setDisplayData();
    this.listenToUserDataEvents();
  }

  gpsToggle(value) {
    if (this.userData.plate == null) {
      this.userData.showToast('Vehicle should be selected!', 'Error!', this.nav);
    } else {
      if (value) {

        let options = { maximumAge:100, timeout:Infinity, enableHighAccuracy:false};
        
        this.watcher = Geolocation.watchPosition(options).subscribe((data) => {
          
          var obj: any = new Object();
          obj.accuracy = data.coords.accuracy;
          obj.altitude = data.coords.altitude;
          obj.altitudeAccuracy = data.coords.altitudeAccuracy;
          obj.heading = data.coords.heading;
          obj.latitude = data.coords.latitude;
          obj.longitude = data.coords.longitude;
          obj.speed = data.coords.speed;

          let postData: any = JSON.stringify(obj);
          this.setGpsData(postData);

          obj.gpstracking = true;
          let gpsCurrentData = JSON.stringify(obj);
          this.storage.set(this.GPS_CURRENT_DATA, gpsCurrentData);
          this.events.publish('gps:on');
          
        })

      } else {

        try {
          var obj: any = new Object();
          obj.gpstracking = false;
          obj.latitude = null;
          obj.longitude = null;
          let gpsCurrentData = JSON.stringify(obj);
          this.storage.set(this.GPS_CURRENT_DATA, gpsCurrentData);

          if(this.watcher != undefined) {
            this.watcher.unsubscribe();
            this.watcher = null;  
          }
          this.events.publish('gps:off');
        } catch (e) {
          alert('Error unsubscribe: ' + e.statusText);
          console.log(e);
        }

      }
    }
  }

  setGpsData(data) {
    this.setPostData(data, this.GPS_DATA, 'gps');
  }

  getGpsData() {
    return this.storage.get(this.GPS_DATA).then((value) => {
      return value;
    });
  }

  getGpsCurrentData() {
    return this.storage.get(this.GPS_CURRENT_DATA).then((value) => {
      return value;
    });
  }

  setDisplayData() {
    this.getGpsCurrentData().then((data) => { 
      data = JSON.parse(data);  
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.gpstracking = data.gpstracking;
    });
  }

  setPostData(data, storage, urlApi) {

    var arrayData = [];

    if(data == null) {
      this.storage.set(storage, (JSON.stringify(arrayData)));
    } else {
      arrayData = JSON.parse(localStorage.getItem(storage));
      if (arrayData == null) {
        arrayData = [];
      }
      data = JSON.parse(data); 
      arrayData.push(data);
      this.storage.set(storage, (JSON.stringify(arrayData).replace(/[\\]/g, '')));
    }
    
    if(data != null && this.userData.checkConnection()) {

      this.getPostData(storage).then((dataStorage) => {

        let postData: any = [];
        var zip = new JSZip(); 
        zip.file("postData.json", dataStorage);

        zip.generateAsync({
          type: "base64",
          compression: "DEFLATE",
          compressionOptions : {level:6}
        }).then((zipFile) => {

           if(dataStorage.length > 180) {
            postData.json = zipFile;
            postData.dataIsCompressed = 1;
           } else {
            postData.json = dataStorage;
            postData.dataIsCompressed = 0;
           }

           this.userData.postApi(urlApi, postData).subscribe(
            res => {
              this.setPostData(null, storage, urlApi);
            },
            error => {
              alert('Error sending data: ' + error.statusText);
              console.log(error);
            }
           );
        });

      });
    }
  }

  getPostData(storage) {
    return this.storage.get(storage).then((value) => {
      return value;
    });
  }

  listenToUserDataEvents() {
    this.events.subscribe('user:logout', () => {
      this.storage.remove(this.GPS_DATA);
      this.storage.remove(this.GPS_CURRENT_DATA);
    });
  }
}