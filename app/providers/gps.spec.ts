import { Geolocation, Toast } from 'ionic-native';
import { Events, Platform, NavController } from 'ionic-angular';
import { UserData } from './user-data';
import { GpsProvider } from './gps';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { beforeEachProviders, describe, expect, inject, it } from '@angular/core/testing';
import { providers }   from '../../test/diExports';

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

  beforeEachProviders(() => providers);
  beforeEachProviders(() => [
    GpsProvider
  ]);

  it('initialises', inject([ GpsProvider ], (gpsProvider) => {
    expect(gpsProvider).not.toBeNull();
  }));

  it('should ask for a vehicle', inject([ GpsProvider ], (gpsProvider) => {
    gpsProvider.userData.plate = null;
    gpsProvider.gpsToggle(true);
    expect(gpsProvider.userData.showToast).toHaveBeenCalled();
  }));
  
  it('should start gps tracking', inject([ GpsProvider ], (gpsProvider) => {
    gpsProvider.gpsToggle(true);
    expect(Geolocation.watchPosition).toHaveBeenCalled();
  }));
  
  it('should start gps tracking with empty data', inject([ GpsProvider ], (gpsProvider) => {
    gpsProvider.setGpsData(null);
    gpsProvider.gpsToggle(true);
    expect(Geolocation.watchPosition).toHaveBeenCalled();
  }));

  it('should subscribe gps location', inject([ GpsProvider ], (gpsProvider) => {
    gpsProvider.gpsToggle(true);
  }));

  it('should unsubscribe watcher', inject([ GpsProvider ], (gpsProvider) => {
    gpsProvider.watcher = new MockClass();
    gpsProvider.gpsToggle(false);
    expect(gpsProvider.watcher).toBeNull();
  }));

  it('should listen to userData events', inject([ GpsProvider ], (gpsProvider) => {
    spyOn(gpsProvider.events, 'subscribe').and.callFake(publishStub);
    gpsProvider.listenToUserDataEvents();
    gpsProvider.userData.logout();
    expect(gpsProvider.events.subscribe.calls.count()).toEqual(1);
  }));

});