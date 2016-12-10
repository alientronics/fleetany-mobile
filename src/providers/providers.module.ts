import { NgModule }                         from '@angular/core';
import { IonicModule }                      from 'ionic-angular';

import {AlertsProvider} from './alerts';
import {GeofenceProvider} from './geofence';
import {GpsProvider} from './gps';
import {BluetoothProvider} from './bluetooth';
import {UserData} from './user-data';

@NgModule({
  declarations: [],
  imports: [
    IonicModule,
  ],
  exports: [],
  entryComponents: [],
  providers: [ ],
})

export class ProvidersModule {}