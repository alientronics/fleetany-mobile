'use strict';

import {App, Platform} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {UserData} from './providers/user-data';
import {Type} from 'angular2/core';

@App({
  templateUrl: 'build/app.html',
  config: {},
  providers: [UserData]
})
export class FleetanyApp {

  private rootPage: Type;
  private platform: Platform;

  constructor(platform: Platform) {
    this.rootPage = TabsPage;
    this.platform = platform;

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

      // Disable BACK button on home
    });

  }

}
