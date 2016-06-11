'use strict';

import {Page, IonicApp, Platform, Alert, Events, NavController} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Http} from 'angular2/http';
import {UserData} from '../../providers/user-data';
import {GpsProvider} from '../../providers/gps';
import {Geolocation, Toast} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/gps/gps.html',
  pipes: [TranslatePipe]
})
export class Gps {

  private events: Events;
  private gpstracking: boolean;
  private latitude: number;
  private longitude: number;
  public watcher: any;
  private app: IonicApp;
  private userData: UserData;
  private gpsProvider: GpsProvider;
  private platform: Platform;
  private bgGeo: any;
  private http: Http;

  constructor(app: IonicApp, userData: UserData, gpsProvider: GpsProvider, platform: Platform, events: Events, http: Http, public nav: NavController, private translate: TranslateService) {
    this.translate = translate;
    this.app = app;
    this.userData = userData;
    this.gpsProvider = gpsProvider;
    this.events = events;
    this.http = http;
    this.platform = platform;
    this.latitude = null;
    this.longitude = null;

    this.setDisplayData();
    this.listenToGpsEvents();
  }

  gpsToggle(value) {
    this.gpsProvider.gpsToggle(value);
  }

  setDisplayData() {
    this.gpsProvider.getGpsCurrentData().then((data) => { 
      data = JSON.parse(data);  

 
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.gpstracking = data.gpstracking;

    });
  }

  listenToGpsEvents() {
    this.events.subscribe('gps:on', () => {
      this.setDisplayData();
    });

    this.events.subscribe('gps:off', () => {
      this.latitude = null;
      this.longitude = null;
      this.gpstracking = false;
    });
  }

  
}
