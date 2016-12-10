import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FleetanyApp } from './app.components';

import {TabsPage, About, Gps, Bluetooth, Login, Alerts, Fuel, PagesModule} from '../pages';
import {GeofenceProvider, AlertsProvider, GpsProvider, BluetoothProvider, UserData} from '../providers';
//import {BluetoothUart} from '../pages/uart/bluetooth';

@NgModule({
  declarations: [
    FleetanyApp,
  ],
  imports: [
    PagesModule,
    IonicModule.forRoot(FleetanyApp)
  ],
  exports: [],
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
