'use strict';

import {Injectable, Inject} from 'angular2/core';
import {Storage, Platform, LocalStorage, Events} from 'ionic-angular';
import {GeofenceProvider} from './geofence';

@Injectable()
export class AlertsProvider {

  public storage: Storage;
  private geofenceProvider: GeofenceProvider;
  private ALERTS_DATA: string;

  constructor(
      @Inject(Events) public events: Events,
      @Inject(Platform) public platform: Platform,
      geofenceProvider: GeofenceProvider
  ) {
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.geofenceProvider = geofenceProvider;
    this.platform = platform;
    this.ALERTS_DATA = '';
    this.listenToGeofenceEvents();
  }

  listenToGeofenceEvents() {
    this.events.subscribe('geofence:vehicleout', () => {
      this.geofenceProvider.getGeofenceData().then((geofence) => { 
        geofence = JSON.parse(geofence);  
        if (geofence.length > 0) {
          this.setAlertsData(geofence);
        } 
      });
    });
  }

  setAlertsData(data) {
    var alerts = [
      {sensorName: 'Sensor 1', temperature: '100', pressure: '80'},
      {sensorName: 'Sensor 2', temperature: '101', pressure: '82'},
      {sensorName: 'Sensor 3', temperature: '102', pressure: '83'}
    ]; 

    if (alerts.length > 0) {
      if(this.ALERTS_DATA == '' || this.ALERTS_DATA == 'alertsdata') {
        this.ALERTS_DATA = JSON.stringify(alerts);
        this.storage.set(this.ALERTS_DATA, JSON.stringify(alerts));
      } else {
        let alerts_data = JSON.parse(this.ALERTS_DATA);
        this.ALERTS_DATA = JSON.stringify(alerts_data.concat(alerts));
        this.storage.set(this.ALERTS_DATA, JSON.stringify(alerts_data.concat(alerts)));
      }
    }
    this.events.publish('alerts:refresh');
  }

  getAlertsData() {
    return this.storage.get(this.ALERTS_DATA).then((value) => {
      return value;
    });
  }

}