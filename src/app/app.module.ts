import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FleetanyApp } from './app.component';

import {TabsPage} from '../pages/tabs/tabs';
import {About} from '../pages/about/about';
import {Gps} from '../pages/gps/gps';
import {Bluetooth} from '../pages/bluetooth';
import {Login} from '../pages/login/login';

import {GeofenceProvider} from '../providers/geofence';
import {AlertsProvider} from '../providers/alerts';
import {GpsProvider} from '../providers/gps';
import {BluetoothProvider} from './providers/bluetooth';
import {UserData} from '../providers/user-data';

@NgModule({
  declarations: [
    FleetanyApp,
    TabsPage,
    About,
    Gps,
    Bluetooth,
    Login
  ],
  imports: [
    IonicModule.forRoot(FleetanyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FleetanyApp,
    TabsPage,
    About,
    Gps,
    Bluetooth,
    Login
  ],
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
export class AppModule {}
