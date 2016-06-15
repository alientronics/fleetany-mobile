import { Bluetooth } from './bluetooth';
import { BLE, BluetoothSerial } from 'ionic-native';
import { Events, Platform, NavController }   from 'ionic-angular';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'
import { TranslateService, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { UserData } from '../../providers/user-data';
import { GpsProvider } from '../../providers/gps';
import { BluetoothProvider } from '../../providers/bluetooth';

let bluetooth: Bluetooth = null;
let bluetoothProvider: BluetoothProvider = null;

class MockClass {
  public present(): any { return true; }
  public unsubscribe(): any { return true; }
  public json(): any { return true; }
}

function showToastStub(message: string, title: string, nav: NavController): any {
  'use strict';
  return null;
}

function publishStub(topic: string):any { return null; }
function bleToggleStub(value: boolean):any { return null; }
function isStub(platform: string):any { return true; }

function listFalseStub(arg: any): any {
  'use strict';

  let promise: Object = {
    then: function(callback: any): void {
      return callback([]); 
    }
  };
  return promise;
}

function listTrueStub(arg: any): any {
  'use strict';

  let promise: Object = {
    then: function(callback: any): void {
      return callback([1,2,3]); 
    }
  };
  return promise;
}

function writeStub(arg: any): any {
  'use strict';

  let promise: Object = {
    then: function(callback: any): void {
      return callback('{}'); 
    }
  };
  return promise;
}

function startScanStub(options: any): any {
  'use strict';

  let watcher: Object = {
    subscribe: function(callback: any, error: any): void {
      return callback(new MockClass());  
    }
  };
  return watcher;
}

describe('Bluetooth', () => {

  beforeEach(() => {   
    let mockClass: any = (<any>new MockClass());
    let events: Events = new Events();
    let platform: Platform = new Platform();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http, platform);
    spyOn(userData, 'showToast').and.callFake(showToastStub);
    spyOn(events, 'publish').and.callFake(publishStub);
    let gpsProvider: GpsProvider = new GpsProvider(events, platform, mockClass, userData);
    bluetoothProvider = new BluetoothProvider(events, platform, mockClass, userData, gpsProvider);
    let translateLoad: TranslateLoader = new TranslateStaticLoader(http, 'assets/i18n', '.json');
    let translate: TranslateService = new TranslateService(http, translateLoad, null);
    bluetooth = new Bluetooth(bluetoothProvider, events, translate);
  });

  it('initialises', () => {
    expect(bluetooth).not.toBeNull();
  });

  it('should call bleToggle provider', () => {
    bluetoothProvider.userData.plate = 1;
    spyOn(bluetooth, 'bleToggle').and.callFake(bleToggleStub);
    bluetooth.bleToggle(true);
    expect(bluetoothProvider.bleToggleBrowser).toHaveBeenCalled();
    expect(bluetoothProvider.events.publish).toHaveBeenCalled();
  });

});