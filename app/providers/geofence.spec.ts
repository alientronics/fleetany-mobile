import { Events, Platform, NavController } from 'ionic-angular';
import { UserData } from './user-data';
import { GeofenceProvider } from './geofence';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'

let geofenceProvider: GeofenceProvider = null;

function publishStub(topic: string):any { return null; }
function isStub(platform: string):any { return true; }


function getGeofenceDataStub(arg: any): any {
  'use strict';

  let promise: Object = {
    then: function(callback: any): void {
      return callback(); 

    }
  };
  return promise;
}

describe('GeofenceProvider', () => {

  beforeEach(() => {   
    let events: Events = new Events();
    let platform: Platform = new Platform();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http, platform);
    spyOn(events, 'publish').and.callFake(publishStub); 
    geofenceProvider = new GeofenceProvider(events, platform, userData);
  });

  it('initialises', () => {
    expect(geofenceProvider).not.toBeNull();
  });

  it('should listen to userData events', () => {
    spyOn(geofenceProvider.platform, 'is').and.callFake(isStub);
    spyOn(geofenceProvider.events, 'subscribe').and.callFake(publishStub);
    geofenceProvider.listenToUserDataEvents();
    geofenceProvider.userData.setPlate(1);
    expect(geofenceProvider.events.subscribe.calls.count()).toEqual(1);
  });
   
  it('should clear storage', () => {
    spyOn(geofenceProvider, 'getGeofenceData').and.callFake(getGeofenceDataStub);
    geofenceProvider.setGeofenceData(null);
    expect(geofenceProvider.getGeofenceData().then).toBeDefined();
  });

  it('should set data to storage', () => {
    spyOn(geofenceProvider, 'getGeofenceData').and.callFake(getGeofenceDataStub);
    geofenceProvider.setGeofenceData(JSON.stringify({
            id:             "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb",
            latitude:       50.2980049,
            longitude:      18.6593152,
            radius:         3000,
            transitionType: 2}));
    expect(geofenceProvider.getGeofenceData().then).toBeDefined();
  });
});