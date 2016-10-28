'use strict';

import { Component } from '@angular/core';
import {Page, Platform, NavController, Alert, NavParams} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Alerts} from '../alerts/alerts';
import {Fuel} from '../fuel/fuel';

@Component({
  templateUrl: 'tabs.html',
  pipes: [TranslatePipe]
})
export class TabsPage {

  private tab1Root;
  private tab2Root;
  private platform: Platform;
  public nav: NavController;
  mySelectedIndex: number;


  constructor(platform: Platform, nav: NavController, navParams: NavParams, private translate: TranslateService) {
    this.translate = translate;
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Alerts;
    this.tab2Root = Fuel;
    this.platform = platform;
    this.nav = nav;
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    //this.platform.registerBackButtonAction(e => this.checkBack(e), 100); //not working ionic 2
    //if (this.platform.is('android')) {
    //  document.addEventListener('backbutton', this.checkBack, false); //not working in ionic 2
    //}
  }

  checkBack() {
    if (true) {

      let confirmAlert = Alert.create({
        title: 'Confirm quit',
        message: 'Do you really want to quit?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Bye',
            handler: () => {
              this.platform.exitApp();
            }
          }
        ]
      });

      this.nav.present(confirmAlert);

    }
  }

}
