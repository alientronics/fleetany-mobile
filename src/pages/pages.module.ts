import { NgModule }         from '@angular/core';
import { IonicModule }      from 'ionic-angular';
import { ProvidersModule } from '../providers';

import { Http, HttpModule } from '@angular/http';
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from 'ng2-translate';

//import {BluetoothUart} from './uart/bluetooth';
import {TabsPage} from './tabs/tabs';
import {Gps} from './gps/gps';
import {Bluetooth} from './bluetooth/bluetooth';
import {Login} from './login/login';
import {Alerts} from './alerts/alerts';
import {Fuel} from './fuel/fuel';
import {About} from './about/about';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    TabsPage,
    About,
    Gps,
    Bluetooth,
    Login,
    Alerts,
    Fuel
  ],
  imports: [ 
    IonicModule,
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({ 
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
  ],
  exports: [
    BrowserModule, HttpModule, TranslateModule,
    TabsPage,
    About,
    Gps,
    Bluetooth,
    Login,
    Alerts,
    Fuel
  ],
  entryComponents: [],
  providers: [ ],
})

export class PagesModule {}