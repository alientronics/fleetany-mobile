'use strict';

import {Page, Events} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {GpsProvider} from '../../providers/gps';

@Page({
  templateUrl: 'build/pages/gps/gps.html',
  pipes: [TranslatePipe]
})
export class Gps {

  private events: Events;
  private gpstracking: boolean;
  private latitude: number;
  private longitude: number;
  private gpsProvider: GpsProvider;
 
  constructor(gpsProvider: GpsProvider, events: Events, private translate: TranslateService) {
    this.translate = translate;
    this.gpsProvider = gpsProvider;
    this.events = events;
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
