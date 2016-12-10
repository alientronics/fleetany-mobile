import { NgModule }         from '@angular/core';
import { IonicModule }      from 'ionic-angular';
import { ProvidersModule } from '../providers';

import {TabsPage, About, Gps, Bluetooth, Login, Alerts, Fuel} from './';
//import {BluetoothUart} from './uart/bluetooth';

@NgModule({
  declarations: [
    //TabsPage,
    //About,
    //Gps,
    //Bluetooth,
    //Login,
    //Alerts,
    //Fuel
  ],
  imports: [ IonicModule ],
  exports: [
    //TabsPage,
    //About,
    //Gps,
    //Bluetooth,
    //Login,
    //Alerts,
    //Fuel
  ],
  entryComponents: [],
  providers: [ ],
})

export class PagesModule {}