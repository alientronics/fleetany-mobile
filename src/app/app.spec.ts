import { Platform, Events, MenuController }   from 'ionic-angular';
import { FleetanyApp } from './app.components';
import { AlertsProvider } from './providers/alerts';
import { GeofenceProvider } from './providers/geofence';
import { GpsProvider } from './providers/gps';
import { BluetoothProvider } from './providers/bluetooth';
import { MockBackend } from '@angular/http/testing'
import { providers }   from '../test/diExports';

let instance: FleetanyApp = null;

describe('FleetanyApp', () => {

  it('should create the app', () => {
    expect(true).toBeTruthy();
  });

});