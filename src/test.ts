import './polyfills.ts';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule, Events, Alert, GestureController, AlertController, Haptic }  from 'ionic-angular';
import { AlertsProviderMock, BluetoothProviderMock, GpsProviderMock, UserDataMock } from './mocks';

import { TranslateService, TranslateStaticLoader, TranslateLoader, TranslateModule } from 'ng2-translate/ng2-translate';
import { Http, BaseRequestOptions, HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";

import {TabsPage, About, Gps, Bluetooth, Login, Alerts, Fuel, PagesModule} from './pages';

import {AlertsProvider} from './providers/alerts';
import {GeofenceProvider} from './providers/geofence';
import {GpsProvider} from './providers/gps';
import {BluetoothProvider} from './providers/bluetooth';
import {UserData} from './providers/user-data';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function (): any { /* no op */};

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing'),
])
  // First, initialize the Angular testing environment.
  .then(([testing, testingBrowser]) => {
    testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );
  })
  // Then we find all the tests.
  .then(() => require.context('./', true, /\.spec\.ts/))
  // And load the modules.
  .then(context => context.keys().map(context))
  // Finally, start Karma to run the tests.
  .then(__karma__.start, __karma__.error);

export class TestUtils {

  public static beforeEachCompiler(components: Array<any>): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(components)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(components: Array<any>): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        ...components,
      ],
      providers: [
        App, Platform, Form, Keyboard, Config, MenuController, NavController, Events, GestureController, AlertController, Haptic,
        {provide: AlertsProvider, useClass: AlertsProviderMock},
        {provide: BluetoothProvider, useClass: BluetoothProviderMock},
        {provide: GpsProvider, useClass: GpsProviderMock},
        {provide: UserData, useClass: UserDataMock},
      ],
      imports: [
        IonicModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        TranslateModule.forRoot({ 
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
        }),
      ],
    });
  }

}
