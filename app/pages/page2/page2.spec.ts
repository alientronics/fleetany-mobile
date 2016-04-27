import { Page2 } from './page2';
import { Geolocation, Toast } from 'ionic-native';
import { IonicApp, Platform } from 'ionic-angular';
import { Events }   from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'

let page2: Page2 = null;

class MockClass {
  public backButton = { subscribe : () => {} }
  public getComponent(): any { return true; }
  public present(): any { return true; }
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

describe('Page2', () => {

  beforeEach(() => {   
    let mockClass: any = (<any>new MockClass());
    let platform: Platform = new Platform();
    let events: Events = new Events();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http);
    userData.plate = 1;
    spyOn(Geolocation, 'watchPosition').and.callFake(watchPositionStub); 
    spyOn(mockClass, 'getComponent').and.returnValue({ tabBadge: 0});
    page2 = new Page2(mockClass, userData, platform, events, http, mockClass);
  });

  it('initialises', () => {
    expect(page2).not.toBeNull();
  });
  
  it('should start gps tracking', () => {
    page2.gpsToggle(true);
    expect(Geolocation.watchPosition).toHaveBeenCalled();
  });

  it('should subscribe gps location', () => {
    page2.gpsToggle(true);
    expect(page2['latitude']).toBe(30.03);
    expect(page2['longitude']).toBe(51.22);
  });

  it('should increment tab badge', () => {
    page2.gpsToggle(true);
    expect(page2['app'].getComponent).toHaveBeenCalledWith('tab2');
  });
  
});