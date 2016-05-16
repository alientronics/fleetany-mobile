'use strict';

import {Page, IonicApp, Platform, Alert, Events, NavController} from 'ionic-angular';
import {Http} from 'angular2/http';
import {UserData} from '../../providers/user-data';
import {Geolocation, Toast} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {

  private events: Events;
  private gpstracking: boolean;
  private latitude: number;
  private longitude: number;
  public watcher: any;
  private app: IonicApp;
  private userData: UserData;
  private platform: Platform;
  private bgGeo: any;
  private http: Http;
  private lastPosition: any;
  private jsondata: any;

  constructor(app: IonicApp, userData: UserData, platform: Platform, events: Events, http: Http, public nav: NavController) {
    this.app = app;
    this.userData = userData;
    this.events = events;
    this.http = http;
    this.platform = platform;
    this.lastPosition = {};
    //if (this.platform.is('mobile')) {
      //this.bgGeo = window.plugins.backgroundGeoLocation;
    //}

  }

  gpsToggle(value) {
    if (this.userData.plate == null) {
      this.userData.showToast('Vehicle should be selected!', 'Error!', this.nav);
    } else {
    	if (value) {
        this.events.publish('gps:on');
	      this.app.getComponent('tab2').tabBadge = 0;
	    } else {
        this.events.publish('gps:off');
	      this.app.getComponent('tab2').tabBadge = '';
	      this.latitude = null;
	      this.longitude = null;
      }

	    if (this.platform.is('mobile')) {
	      this.gpsToggleBrowser(value);
	    } else {
	      this.gpsToggleBrowser(value);
	    }
    }
  }

  gpsToggleBrowser(value) {
    if (value) {

      let options = { maximumAge:100, timeout:Infinity, enableHighAccuracy:false};
      
      this.watcher = Geolocation.watchPosition(options).subscribe((data) => {
        
        this.userData.getBluetoothData().then((bluetoothData) => {
          let postData: any = data.coords;
          postData.json = bluetoothData;
          
          if ( JSON.stringify(data.coords) != JSON.stringify(this.lastPosition) ) {
            //only send if 
            this.userData.postApi('gps', postData).subscribe(
              res => {
                this.latitude = postData.latitude;
                this.longitude = postData.longitude;
                this.jsondata = postData.json;
                this.app.getComponent('tab2').tabBadge++;
                this.lastPosition = data.coords;
                this.userData.setBluetoothData(null);
              },
              error => {
                alert('Error sending data: ' + error.statusText);
                console.log(error);
              }
            );

          }
        });
      })

    } else {

      try {
        this.watcher.unsubscribe();
        this.watcher = null;
      } catch (e) {
        alert('Error unsubscribe: ' + e.statusText);
        console.log(e);
      }

    }
  }

  gpsToggleMobile(value) {

  }
  
}
