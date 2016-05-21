'use strict';

import {Page, IonicApp, Platform, Alert, Events, NavController} from 'ionic-angular';
import {Http} from 'angular2/http';
import {UserData} from '../../providers/user-data';
import {Geolocation, Toast} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/gps/gps.html'
})
export class Gps {

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
        
        var obj: any = new Object();
        obj.accuracy = data.coords.accuracy;
        obj.altitude = data.coords.altitude;
        obj.altitudeAccuracy = data.coords.altitudeAccuracy;
        obj.heading = data.coords.heading;
        obj.latitude = data.coords.latitude;
        obj.longitude = data.coords.longitude;
        obj.speed = data.coords.speed;

        let postData: any = JSON.stringify(obj);

        this.userData.setGpsData(postData);
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
        this.app.getComponent('tab2').tabBadge++;
        this.lastPosition = data.coords;
 
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
