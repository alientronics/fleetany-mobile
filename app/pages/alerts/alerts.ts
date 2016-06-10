'use strict';

import {Page, Events} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {UserData} from '../../providers/user-data';

@Page({
  templateUrl: 'build/pages/alerts/alerts.html',
  pipes: [TranslatePipe]
})

export class Alerts {

  public alerts: Array<any>;
  private userData: UserData;
  private events: Events;

  constructor(private translate: TranslateService, userData: UserData, events: Events) {

    this.translate = translate;
    this.userData = userData;
    this.events = events;

    this.userData.getAlertsData().then((alerts) => { 
      alerts = JSON.parse(alerts);  
      if (alerts.length > 0) {
        this.alerts = alerts;
      } 
    });

    this.listenToAlertsEvents();
  }

  listenToAlertsEvents() {
    this.events.subscribe('alerts:vehicleout', () => {
      this.userData.getAlertsData().then((alerts) => { 
        alerts = JSON.parse(alerts);  
        if (alerts.length > 0) {
          this.alerts = alerts;
        } 
      });
    });
  }

}
