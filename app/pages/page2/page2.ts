'use strict';

import {Page} from 'ionic-framework/ionic';
import {Geolocation} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {

  private gpstracking: boolean;
  private latitude: number;
  private longitude: number;

  constructor() {
  	this.gpstracking = true;

    let options = { maximumAge:0, timeout:Infinity, enableHighAccuracy:false};

    let watch = Geolocation.watchPosition(options);
    watch.subscribe((data) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    })

  }

}
