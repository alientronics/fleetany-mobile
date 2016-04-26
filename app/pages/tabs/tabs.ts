'use strict';

import {Page, Platform, NavController, Alert} from 'ionic-angular';
import {Page1} from '../page1/page1';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root;
  private tab2Root;
  private tab3Root;
  private platform: Platform;
  private nav: NavController;

  constructor(platform: Platform, nav: NavController) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Page1;
    this.tab2Root = Page2;
    this.tab3Root = Page3;
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
