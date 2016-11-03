import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FleetanyApp } from './app.components';

import {TabsPage} from '../pages/tabs/tabs';
import {About} from '../pages/about/about';
import {Gps} from '../pages/gps/gps';
import {Bluetooth} from '../pages/bluetooth/bluetooth';
//import {BluetoothUart} from '../pages/uart/bluetooth';
import {Login} from '../pages/login/login';
import {Alerts} from '../pages/alerts/alerts';
import {Fuel} from '../pages/fuel/fuel';

import {GeofenceProvider} from '../providers/geofence';
import {AlertsProvider} from '../providers/alerts';
import {GpsProvider} from '../providers/gps';
import {BluetoothProvider} from '../providers/bluetooth';
import {UserData} from '../providers/user-data';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    FleetanyApp,
    TabsPage,
    About,
    Gps,
    Bluetooth,
    Login,
    Alerts,
    Fuel
    //,BluetoothUart
  ],
  imports: [
    IonicModule.forRoot(FleetanyApp),
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({ 
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  exports: [BrowserModule, HttpModule, TranslateModule],
  bootstrap: [IonicApp],
  entryComponents: [
    FleetanyApp,
    TabsPage,
    About,
    Gps,
    Bluetooth,
    Login,
    Alerts,
    Fuel
    //,BluetoothUart
  ],
  providers: [
    UserData,
    GeofenceProvider,
    AlertsProvider,
    GpsProvider,
    BluetoothProvider,
    Storage
  ]
})
export class AppModule {}
