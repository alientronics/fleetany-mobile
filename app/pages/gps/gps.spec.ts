import { Gps } from './gps';
import { Geolocation, Toast } from 'ionic-native';
import { Platform, NavController } from 'ionic-angular';
import { Events }   from 'ionic-angular';
import { TranslateService, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { UserData } from '../../providers/user-data';
import { GpsProvider } from '../../providers/gps';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { beforeEachProviders, describe, expect, inject, it } from '@angular/core/testing';
import { providers }   from '../../../test/diExports';
import { provide } from '@angular/core'

class MockClass {
  public backButton = { subscribe : () => {} }
  public getComponent(): any { return true; }
  public present(): any { return true; }
  public unsubscribe(): any { return true; }
  public loading(): any { return true; }
}

function showToastStub(message: string, title: string, nav: NavController): any {
  'use strict';
  return null;
}

function publishStub(topic: string):any { return null; }
function gpsToggleStub(value: boolean):any { return null; }

function gpsCurrentDataStub(arg: any): any {
  'use strict';

  let promise: Object = {
    then: function(callback: any): void {
      return callback('{"gpstracking":true,"latitude": 30.03,"longitude": 51.22}'); 

    }
  };
  return promise;
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

  beforeEachProviders(() => providers);
  beforeEachProviders(() => [
    GpsProvider,
    provide(UserData, {useClass: MockClass}),
    Gps
  ]);

  it('initialises', inject([ Gps ], (gps) => {
    expect(gps).not.toBeNull();
  }));
  
  it('should call start gps provider', inject([ Gps, GpsProvider ], (gps, gpsProvider) => {
    spyOn(gpsProvider, 'gpsToggle').and.callFake(gpsToggleStub);
    gps.gpsToggle(true);
    expect(gpsProvider.gpsToggle).toHaveBeenCalled();
  }));

  it('should set display data', inject([ Gps, GpsProvider ], (gps, gpsProvider) => {
    spyOn(gpsProvider, 'getGpsCurrentData').and.callFake(gpsCurrentDataStub);
    gps.setDisplayData();
    expect(gps.gpstracking).toBe(true);
    expect(gps.latitude).toBe(30.03);
    expect(gps.longitude).toBe(51.22);
  }));

  it('should listen to gps events', inject([ Gps ], (gps) => {
    spyOn(gps.events, 'subscribe').and.callFake(publishStub);
    gps.listenToGpsEvents();
    expect(gps.events.subscribe.calls.count()).toEqual(2);
  }));

});