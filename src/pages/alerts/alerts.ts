'use strict';

import { Component } from '@angular/core';
import {Events} from 'ionic-angular';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {AlertsProvider} from '../../providers/alerts';

@Component({
  templateUrl: 'alerts.html'
})

export class Alerts {

  public alerts: Array<any>;
  private alertsProvider: AlertsProvider;
  private events: Events;

  constructor(private translate: TranslateService, alertsProvider: AlertsProvider, events: Events) {

    this.translate = translate;
    this.alertsProvider = alertsProvider;
    this.events = events;

    this.alertsProvider.getAlertsData().then((alerts) => { 
      alerts = JSON.parse(alerts);  
      if (alerts.length > 0) {
        this.alerts = alerts;
      } 
    });

    this.listenToAlertsEvents();
  }

  listenToAlertsEvents() {
    this.events.subscribe('alerts:refresh', () => {
      this.alertsProvider.getAlertsData().then((alerts) => { 
        alerts = JSON.parse(alerts);  
        if (alerts.length > 0) {
          this.alerts = alerts;
        } 
      });
    });
  }

}
