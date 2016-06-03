import { Gps } from './gps';
import { Geolocation, Toast } from 'ionic-native';
import { IonicApp, Platform } from 'ionic-angular';
import { Events }   from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'

let gps: Gps = null;

class MockClass {
  public backButton = { subscribe : () => {} }
  public getComponent(): any { return true; }
  public present(): any { return true; }
  public unsubscribe(): any { return true; }
}

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


function postApiStub(options: any): any {
  'use strict';

  let watcher: Object = {
    subscribe: function(callback: any, error: any): void {
      return callback(); 
    }
  };
  return watcher;
}

function getBluetoothDataStub(): any {
  'use strict';

  let promise: Object = {
    then: function(callback: any): void {
      return callback(); 
    }
  };
  return promise;
}

describe('Gps', () => {

  beforeEach(() => {   
    let mockClass: any = (<any>new MockClass());
    let platform: Platform = new Platform();
    let events: Events = new Events();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http, platform);
    userData.plate = 1;
    spyOn(userData, 'postApi').and.callFake(postApiStub);
    spyOn(userData, 'getBluetoothData').and.callFake(getBluetoothDataStub); 
    spyOn(Geolocation, 'watchPosition').and.callFake(watchPositionStub); 
    spyOn(mockClass, 'getComponent').and.returnValue({ tabBadge: 0});
    gps = new Gps(mockClass, userData, platform, events, http, mockClass, mockClass);
  });

  it('initialises', () => {
    expect(gps).not.toBeNull();
  });
  
  it('should start gps tracking', () => {
    gps.gpsToggle(true);
    expect(Geolocation.watchPosition).toHaveBeenCalled();
  });

  it('should subscribe gps location', () => {
    gps.gpsToggle(true);
    expect(gps['latitude']).toBe(30.03);
    expect(gps['longitude']).toBe(51.22);
  });

  it('should unsubscribe watcher', () => {
    gps.watcher = new MockClass();
    gps.gpsToggleBrowser(false);
    expect(gps.watcher).toBeNull();
  });
  
});