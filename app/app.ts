'use strict';

import {App, Platform, Events} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {UserData} from './providers/user-data';
import {Type} from 'angular2/core';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [UserData]
})
export class FleetanyApp {

  private rootPage: Type;
  private platform: Platform;
  private userData: UserData;
  private events: Events;
  private loggedIn: boolean;

  constructor(platform: Platform, events: Events, userData: UserData) {
    this.rootPage = TabsPage;
    this.platform = platform;
    this.userData = userData;
    this.events = events;
    this.loggedIn = false;

    this.platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.loggedIn = (hasLoggedIn == 'true');
    });

    this.listenToLoginEvents();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
    });
  }

}
