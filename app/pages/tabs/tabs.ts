'use strict';

import {Page, Platform, NavController, Alert} from 'ionic-angular';
import {Login} from '../login/login';
import {Gps} from '../gps/gps';
import {Fuel} from '../fuel/fuel';
import {Bluetooth} from '../bluetooth/bluetooth';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root;
  private tab2Root;
  private tab3Root;
  private tab4Root;
  private platform: Platform;
  public nav: NavController;

  constructor(platform: Platform, nav: NavController) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Login;
    this.tab2Root = Gps;
    this.tab3Root = Fuel;
    this.tab4Root = Bluetooth;
    this.platform = platform;
    this.nav = nav;

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
