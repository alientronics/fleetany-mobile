'use strict';

import {ViewChild} from 'angular2/core';
import {App, Platform, Events, Nav, MenuController} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {TabsPage} from './pages/tabs/tabs';
import {UserData} from './providers/user-data';
import {Type} from 'angular2/core';
import {About} from './pages/about/about';
import {Gps} from './pages/gps/gps';
import {Bluetooth} from './pages/bluetooth/bluetooth';
import {Login} from './pages/login/login';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@App({
  templateUrl: 'build/app.html',
  config: {},
  providers: [UserData, TranslateService],
  pipes: [TranslatePipe]
})
export class FleetanyApp {

  @ViewChild(Nav) nav: Nav;

  private rootPage: Type;
  private platform: Platform;

  appLoggedInPages: PageObj[] = [
    { title: 'Home', component: Login, icon: 'home' },
    { title: 'Alerts', component: TabsPage, icon: 'alert' },
    { title: 'Fuel Tracking', component: TabsPage, index: 1, icon: 'color-fill' },
    { title: 'GPS', component: Gps, icon: 'compass' },
    { title: 'BLE', component: Bluetooth, icon: 'bluetooth' },
    { title: 'About', component: About, icon: 'information-circle' },
  ];
  appLoggedOutPages: PageObj[] = [
    { title: 'About', component: About, icon: 'information-circle' },
  ];
  loggedInPages: PageObj[] = [
    { title: 'Logout', component: Login, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: Login, icon: 'log-in' }
  ];

  constructor(platform: Platform, 
    private events: Events,
    private userData: UserData,
    private menu: MenuController
  ) {

    this.rootPage = Login;
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
      this.userData.hasLoggedIn().then((hasLoggedIn) => {
        this.enableMenu(hasLoggedIn !== null);
      });
    
    });

    this.listenToLoginEvents();
    this.initializeTranslateServiceConfig();

  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      if (this.nav) {
        this.nav.push(TabsPage).then( () => { //force page reload
          this.nav.popToRoot();
        });
      }
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }  

  initializeTranslateServiceConfig() {
    var prefix = 'assets/i18n/';
    var suffix = '.json';
    this.translate.useStaticFilesLoader(prefix, suffix);
   
    var userLang = navigator.language.split('-')[0];
    userLang = /(en|pt-br)/gi.test(userLang) ? userLang : 'en';
   
    this.translate.setDefaultLang('en');
   
    this.translate.use(userLang);
  }

}
