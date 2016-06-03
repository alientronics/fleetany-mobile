'use strict';

import {Page} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Page({
  templateUrl: 'build/pages/alerts/alerts.html',
  pipes: [TranslatePipe]
})

export class Alerts {

  public alerts: Array<any>;

  constructor(private translate: TranslateService) {
    this.translate = translate;
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
