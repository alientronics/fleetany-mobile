import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FleetanyApp } from './app.components';

import {TabsPage, About, Gps, Bluetooth, Login, Alerts, Fuel} from '../pages';
import {GeofenceProvider, AlertsProvider, GpsProvider, BluetoothProvider, UserData} from '../providers';
//import {BluetoothUart} from '../pages/uart/bluetooth';

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
