'use strict';

import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/alerts/alerts.html',
})

export class Alerts {

  public alerts: Array<any>;

  constructor() {
    var alerts = [
      {sensorName: 'Sensor 1', temperature: '100', pressure: '80'},
      {sensorName: 'Sensor 2', temperature: '101', pressure: '82'},
      {sensorName: 'Sensor 3', temperature: '102', pressure: '83'}
    ]; 

    if (alerts.length > 0) {
      this.alerts = alerts;
    }
  }

}
