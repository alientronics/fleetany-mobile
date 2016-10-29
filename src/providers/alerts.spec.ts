import { Platform, NavController } from 'ionic-angular';
import { UserData } from './user-data';
import { AlertsProvider } from './alerts';
import { GeofenceProvider } from './geofence';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { ComponentFixture, TestBed }  from '@angular/core/testing';
import { TestUtils } from '../../test';

let fixture: ComponentFixture<AlertsProvider> = null;
let instance: any = null;

function publishStub(topic: string):any { return null; }

describe('AlertsProvider', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([AlertsProvider, GeofenceProvider]);
    fixture = TestBed.createComponent(AlertsProvider);
    instance = fixture.debugElement.componentInstance;
  });

  it('initialises', (alertsProvider) => {
    expect(alertsProvider).not.toBeNull();
  });

  it('should listen to geofence events', (alertsProvider) => {
    spyOn(alertsProvider.events, 'subscribe').and.callFake(publishStub);
    alertsProvider.listenToGeofenceEvents();
    expect(alertsProvider.events.subscribe.calls.count()).toEqual(1);
  });

});