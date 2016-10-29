'use strict';

import { Component, NgZone } from '@angular/core';
import { Events, NavController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {GpsProvider} from '../../providers/gps';
import {UserData} from '../../providers/user-data';

@Component({
  templateUrl: 'gps.html'
})
export class Gps {

  private events: Events;
  private gpstracking: boolean;
  private latitude: number;
  private longitude: number;
  private gpsProvider: GpsProvider;
  private count: number;
 
  constructor(
      gpsProvider: GpsProvider, 
      events: Events, 
      private translate: TranslateService,
      private nav: NavController,
      private userData: UserData,
      private _zone: NgZone
  ) {
    this.translate = translate;
    this.gpsProvider = gpsProvider;
    this.events = events;
    this.latitude = null;
    this.longitude = null;
    this.count = 0;

    this.setDisplayData();
    this.listenToGpsEvents();
  }

  gpsToggle(value) {
    this.gpsProvider.gpsToggle(value);
    this.userData.loading(this.nav, "GPS");
  }

  setDisplayData() {
    this.gpsProvider.getGpsCurrentData().then((data) => { 
      this._zone.run(() => {
        let dataJson = JSON.parse(data);  
        this.latitude = dataJson.latitude;
        this.longitude = dataJson.longitude;
        this.gpstracking = dataJson.gpstracking;
        this.count = dataJson.count;
      });
    });
  }

  listenToGpsEvents() {
    this.events.subscribe('gps:on', () => {
      this.setDisplayData();
    });

    this.events.subscribe('gps:off', () => {
      this._zone.run(() => {
        this.latitude = null;
        this.longitude = null;
        this.gpstracking = false;
        this.count = 0;
      });
    });
  }
  
}
