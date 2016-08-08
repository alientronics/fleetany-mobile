import {App, Platform, Events, Nav, MenuController, ionicBootstrap} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {UserData} from './providers/user-data';
import {GeofenceProvider} from './providers/geofence';
import {AlertsProvider} from './providers/alerts';
import {GpsProvider} from './providers/gps';
import {BluetoothProvider} from './providers/bluetooth';
import {About} from './pages/about/about';
import {Gps} from './pages/gps/gps';
import {Bluetooth} from './pages/bluetooth/bluetooth';
import {Login} from './pages/login/login';
import {Component, provide, ViewChild, Type} from '@angular/core';
import {Http} from '@angular/http';
import {TranslateService, TranslateStaticLoader, TranslateLoader, TranslatePipe} from 'ng2-translate/ng2-translate';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html',
  pipes: [TranslatePipe],
  providers: [
    UserData,
    GeofenceProvider,
    AlertsProvider,
    GpsProvider,
    BluetoothProvider,
    provide(TranslateLoader, {
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    }),
    TranslateService
  ]
})
export class FleetanyApp {

  @ViewChild(Nav) nav: Nav;

  private rootPage: Type;
  private platform: Platform;

  appLoggedInPages: PageObj[] = [
    { title: 'menu.Home', component: Login, icon: 'home' },
    //{ title: 'menu.Alerts', component: TabsPage, icon: 'alert' },
    //{ title: 'menu.FuelTracking', component: TabsPage, index: 1, icon: 'color-fill' },
    { title: 'menu.GPS', component: Gps, icon: 'compass' },
    { title: 'menu.BLE', component: Bluetooth, icon: 'bluetooth' },
    { title: 'menu.About', component: About, icon: 'information-circle' },
  ];
  appLoggedOutPages: PageObj[] = [
    { title: 'menu.About', component: About, icon: 'information-circle' },
  ];
  loggedInPages: PageObj[] = [
    //{ title: 'menu.Logout', component: Login, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    //{ title: 'menu.Login', component: Login, icon: 'log-in' }
  ];

  constructor(platform: Platform, 
    private events: Events,
    private userData: UserData,
    //private geofenceProvider: GeofenceProvider,
    private alertsProvider: AlertsProvider,
    private menu: MenuController,
    private translate: TranslateService
  ) {

    this.translate = translate;
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
    
      if (this.platform.is('mobile')) {
        window.powerManagement.dim(function() {
            //alert('Wakelock acquired');
        }, function() {
            //alert('Failed to acquire wakelock');
        });
      }

    });

    this.listenToLoginEvents();
    this.initializeTranslateServiceConfig();
    this.alertsProvider.setAlertsData([]);

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

    if (page.title === 'menu.Logout') {
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
        this.nav.setRoot(Login);
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
    var userLang = navigator.language.split('-')[0];
    userLang = /(en|pt-br)/gi.test(userLang) ? userLang : 'en';
    userLang = "pt-br"; //keep language
   
    this.translate.setDefaultLang('en');
   
    this.translate.use(userLang);
  }

}

ionicBootstrap(FleetanyApp, [], {
  tabbarPlacement: 'top'
});