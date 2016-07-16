import { TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS} from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders, beforeEachProviders, describe, expect, inject, it } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { Platform, Events, MenuController }   from 'ionic-angular';
import { FleetanyApp } from './app';
import { AlertsProvider } from './providers/alerts';
import { GeofenceProvider } from './providers/geofence';
import { GpsProvider } from './providers/gps';
import { BluetoothProvider } from './providers/bluetooth';
import { MockBackend } from '@angular/http/testing'
import { providers }   from '../test/diExports';

// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

describe('FleetanyApp', () => {

  beforeEachProviders(() => providers);
  beforeEachProviders(() => [
    AlertsProvider,
    GpsProvider,
    BluetoothProvider,
    MenuController,
    GeofenceProvider,
    FleetanyApp
  ]);

  it('should create the app', inject([ FleetanyApp ], (app) => {
    expect(app).toBeTruthy();
  }));

});