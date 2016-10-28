import { Platform, NavController } from 'ionic-angular';
import { UserData } from './user-data';
import { AlertsProvider } from './alerts';
import { GeofenceProvider } from './geofence';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { beforeEachProviders, describe, expect, inject, it } from '@angular/core/testing';
import { providers }   from '../../test/diExports';

function publishStub(topic: string):any { return null; }

describe('AlertsProvider', () => {

  beforeEachProviders(() => providers);
  beforeEachProviders(() => [
    GeofenceProvider,
    AlertsProvider
  ]);

  it('initialises', inject([ AlertsProvider ], (alertsProvider) => {
    expect(alertsProvider).not.toBeNull();
  }));

  it('should listen to geofence events', inject([ AlertsProvider ], (alertsProvider) => {
    spyOn(alertsProvider.events, 'subscribe').and.callFake(publishStub);
    alertsProvider.listenToGeofenceEvents();
    expect(alertsProvider.events.subscribe.calls.count()).toEqual(1);
  }));

});