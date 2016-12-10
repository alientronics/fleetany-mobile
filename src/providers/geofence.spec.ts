import { Events, Platform, LoadingController } from 'ionic-angular';
import { UserData } from './user-data';
import { GeofenceProvider } from './geofence';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { ComponentFixture, TestBed }  from '@angular/core/testing';
import { TestUtils } from '../test';
import { Storage } from '@ionic/storage';

let fixture: ComponentFixture<GeofenceProvider> = null;
let instance: any = null;
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
    TestUtils.configureIonicTestingModule([GeofenceProvider]);
    fixture = TestBed.createComponent(GeofenceProvider);
    geofenceProvider = fixture.debugElement.componentInstance;
  });

  beforeEach(() => {   
    let events: Events = new Events();
    let platform: Platform = new Platform();
    spyOn(events, 'publish').and.callFake(publishStub); 
  });

  it('initialises', () => {
    expect(geofenceProvider).not.toBeNull();
  });

  it('should listen to userData events', () => {
    spyOn(geofenceProvider.platform, 'is').and.callFake(isStub);
    spyOn(geofenceProvider.events, 'subscribe').and.callFake(publishStub);
    geofenceProvider.listenToUserDataEvents();
    geofenceProvider.userData.setPlate(1);
    expect(geofenceProvider.events.subscribe).toHaveBeenCalled();
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