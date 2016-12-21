import { Platform, Events, MenuController }   from 'ionic-angular';
import { FleetanyApp } from './app.components';
import { AlertsProvider } from './providers/alerts';
import { GeofenceProvider } from './providers/geofence';
import { GpsProvider } from './providers/gps';
import { BluetoothProvider } from './providers/bluetooth';
import { MockBackend } from '@angular/http/testing'
import { providers }   from '../test/diExports';
import { ComponentFixture, async }  from '@angular/core/testing';

import { AlertsProviderMock, StorageMock, UserDataMock, GpsProviderMock, AlertControllerMock, NavMock, TranslateServiceMock } from '../mocks';
import { TestUtils } from '../test';

let fixture: ComponentFixture<FleetanyApp> = null;
let instance: any = null;

describe('FleetanyApp', () => {

  beforeEach(() => {
    instance = new FleetanyApp(
    			<any>new Platform(),
    			<any>new Events(), 
    			<any>new UserDataMock(),
    			<any>new AlertsProviderMock(),
    			<any>new MenuController(),
    			<any>new TranslateServiceMock()
    		);
    instance['nav'] = (<any>new NavMock());
  });

  it('should create the app', () => {
    expect(instance).toBeTruthy();
  });

});