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
  private watcher: any;
  private app: IonicApp;
  private userData: UserData;
  private platform: Platform;
  private bgGeo: any;

  constructor(app: IonicApp, userData: UserData, platform: Platform, events: Events, http: Http, public nav: NavController) {
    this.app = app;
    this.userData = userData;
    this.events = events;
    this.http = http;
    this.platform = platform;

    if (this.platform.is('mobile')) {
      //this.bgGeo = window.plugins.backgroundGeoLocation;
    }

  }

  gpsToggle(value) {
    if (this.userData.plate == undefined) {
      if (window.cordova) {
      	Toast.show("Vehicle should be selected!", 5000, "center").subscribe(
    		  toast => {
    		    console.log(toast);
    		  }
    		);
      } else {
		    let alert = Alert.create({
  	      title: 'Error!',
  	      message: 'Vehicle should be selected!',
  	      buttons: ['Ok']
  	    });
	     this.nav.present(alert);
      }
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

      let options = { maximumAge:0, timeout:Infinity, enableHighAccuracy:false};
      
      this.watcher = Geolocation.watchPosition(options).subscribe((data) => {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
        
        let params = data.coords;
         
        this.userData.postApi('gps', params).subscribe(
          res => {
            this.app.getComponent('tab2').tabBadge++;
          },
          error => {
            alert('Error sending data: ' + error.statusText);
            console.log(error);
          }
        );
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
