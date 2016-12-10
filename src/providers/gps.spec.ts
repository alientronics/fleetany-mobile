import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { GpsProvider } from './gps';
import { BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { ComponentFixture, TestBed }  from '@angular/core/testing';
import { TestUtils } from '../test';

let fixture: ComponentFixture<GpsProvider> = null;
let instance: any = null;

class GeoLocMock {
  public watchPosition(options: any): any { return true; }
}

class MockClass {
  public backButton = { subscribe : () => {} }
  public getComponent(): any { return true; }
  public present(): any { return true; }
  public unsubscribe(): any { return true; }
}

function showToastStub(message: string, title: string, nav: NavController): any {
  'use strict';
  return null;
}

function publishStub(topic: string):any { return null; }

function watchPositionStub(options: any): any {
  'use strict';

  let watcher: Object = {
    subscribe: function(callback : any): void {
      let data = { 
        coords: { 
          latitude: 30.03,
          longitude: 51.22,
        }
      }
      return callback(data); 
    }
  };
  return watcher;
}

describe('GpsProvider', () => {

  let gpsProvider:GpsProvider;

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([GpsProvider]);
    fixture = TestBed.createComponent(GpsProvider);
    gpsProvider = fixture.debugElement.componentInstance;
  });

  beforeEach( () => {
    spyOn(gpsProvider.userData, 'showToast').and.callFake(showToastStub);
    spyOn(gpsProvider.events, 'publish').and.callFake(publishStub);
    spyOn(Geolocation, 'watchPosition').and.callFake(watchPositionStub); 
  });

  it('initialises', () => {
    expect(gpsProvider).not.toBeNull();
  });

  it('should ask for a vehicle', () => {
    gpsProvider.userData.plate = null;
    gpsProvider.gpsToggle(true);
    expect(gpsProvider.userData.showToast).toHaveBeenCalled();
  });
  
  it('should start gps tracking', () => {
    gpsProvider.userData.plate = 1;
    gpsProvider.gpsToggle(true);
    expect(Geolocation.watchPosition).toHaveBeenCalled();
  });
  
  it('should start gps tracking with empty data', () => {
    gpsProvider.userData.plate = 1;
    gpsProvider.setGpsData(null);
    gpsProvider.gpsToggle(true);
    expect(Geolocation.watchPosition).toHaveBeenCalled();
  });

  it('should subscribe gps location', () => {
    gpsProvider.gpsToggle(true);
  });

  it('should unsubscribe watcher', () => {
    gpsProvider.watcher = new MockClass();
    gpsProvider.userData.plate = 1;
    gpsProvider.gpsToggle(false);
    expect(gpsProvider.watcher).toBeNull();
  });

  it('should listen to userData events', () => {
    spyOn(gpsProvider.events, 'subscribe').and.callFake(publishStub);
    gpsProvider.listenToUserDataEvents();
    gpsProvider.userData.logout();
    expect(gpsProvider.events.subscribe).toHaveBeenCalled();
  });

});