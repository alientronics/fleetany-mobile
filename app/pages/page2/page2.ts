'use strict';

import {Page, IonicApp, Platform} from 'ionic-angular';
import {Geolocation} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {

  private gpstracking: boolean;
  private latitude: number;
  private longitude: number;
  private watcher: any;
  private app: IonicApp;
  private platform: Platform;
  private bgGeo: any;

  constructor(app: IonicApp, platform: Platform) {
  	this.gpstracking = false;
    this.app = app;
    this.platform = platform;

    if (this.platform.is('mobile')) {
      //this.bgGeo = window.plugins.backgroundGeoLocation;
    }

  }

  gpsToggle(value) {

    if (value) {
      this.app.getComponent('tab2').tabBadge = 0;
    } else {
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

  gpsToggleBrowser(value) {
    if (value) {

      let options = { maximumAge:0, timeout:Infinity, enableHighAccuracy:false};
      
      this.watcher = Geolocation.watchPosition(options).subscribe((data) => {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
        this.app.getComponent('tab2').tabBadge++;
      })

    } else {

      if (this.watcher) {
        this.watcher.unsubscribe();
        this.watcher = null;
      }

    }
  }

  gpsToggleMobile(value) {

  }

}
