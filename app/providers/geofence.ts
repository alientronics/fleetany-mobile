'use strict';

import {Injectable, Inject} from 'angular2/core';
import {Storage, Platform, LocalStorage, Events} from 'ionic-angular';
import {UserData} from './user-data';

@Injectable()
export class GeofenceProvider {

  public storage: Storage;
  private userData: UserData;
  private GEOFENCE_DATA: string;

  constructor(
      @Inject(Events) public events: Events,
      @Inject(Platform) public platform: Platform,
      userData: UserData
  ) {
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.userData = userData;
    this.platform = platform;
    this.GEOFENCE_DATA = 'geofenceData';

    this.initializeGeofence();
    this.listenToUserDataEvents();
  }

  initializeGeofence() {
    this.platform.ready().then(() => {
      if (this.platform.is('mobile')) {

        window.geofence.initialize().then(function () {
            console.log("Successful initialization");
        });

        window.geofence.onTransitionReceived = function (geofences) {
            geofences.forEach(function (geo) {
                this.setGeofenceData(geo);
                this.events.publish('geofence:vehicleout');
            });
        };

        
      }
    }); 
  }

  listenToUserDataEvents() {
    this.events.subscribe('user:changeplate', () => {
      if (this.platform.is('mobile')) {
        window.geofence.removeAll().then(() => { 
          console.log('All geofences successfully removed.');
        });

        this.userData.getPlate().then((plate) => {
          this.userData.getVehicles().then((vehicles) => {
            vehicles.forEach(function(value, index) {
              if(value.key == plate) {
                let geofence = JSON.parse(value.geofence);
                if(geofence.latitude != undefined) {
                  geofence.id = plate;
                  window.geofence.addOrUpdate(geofence).then(function () {
                    console.log('Geofence successfully added');
                  });
                }
              }
            });
          });
        });
      }
    });
  }

  setGeofenceData(data) {

    var arrayData = [];

    if(data == null) {
      this.storage.set(this.GEOFENCE_DATA, (JSON.stringify(arrayData)));
    } else {
      arrayData = JSON.parse(localStorage.getItem(this.GEOFENCE_DATA));
      data = JSON.parse(data); 
      arrayData.push(data);
      this.storage.set(this.GEOFENCE_DATA, (JSON.stringify(arrayData).replace(/[\\]/g, '')));
    }
  }

  getGeofenceData() {
    return this.storage.get(this.GEOFENCE_DATA).then((value) => {
      return value;
    });
  }

}