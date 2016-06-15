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
function bleDeviceChangedStub(value: string):any { return null; }
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

function bluetoothCurrentDataStub(arg: any): any {
  'use strict';

  let promise: Object = {
    then: function(callback: any): void {
      return callback('{"blescan":false,"bledevice":"73:08:19:71:8C:9B",'+
                      '"devices":[{"id":"73:08:19:71:8C:9B","name":"Sensor 1"},'+
                                  '{"id":"73:08:19:71:8C:9C","name":"Sensor 2"},'+
                                  '{"id":"73:08:19:71:8C:9D","name":"Sensor 3"}],'+
                      '"datastream":[{"id":"0000000001","pr":127,"tp":22.0,"ba":2.95}]}'); 

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
    spyOn(bluetoothProvider, 'bleToggle').and.callFake(bleToggleStub);
    bluetooth.bleToggle(true);
    expect(bluetoothProvider.bleToggle).toHaveBeenCalled();
  });

  it('should send data to provider', () => {
    spyOn(bluetoothProvider, 'sendData').and.callFake(writeStub);
    bluetooth.sendData();
    expect(bluetoothProvider.sendData).toHaveBeenCalled();
  });

  it('should call bledeviceChanged provider', () => {
    spyOn(bluetoothProvider, 'bledeviceChanged').and.callFake(bleDeviceChangedStub);
    bluetooth.bledeviceChanged('73:08:19:71:8C:9B');
    expect(bluetoothProvider.bledeviceChanged).toHaveBeenCalled();
  });

  it('should set display data', () => {
    spyOn(bluetoothProvider, 'getBluetoothCurrentData').and.callFake(bluetoothCurrentDataStub);
    bluetooth.setDisplayData();
    expect(bluetooth.blescan).toBe(false);
    expect(bluetooth.bledevice).toBe('73:08:19:71:8C:9B');
    expect(bluetooth.devices.length).toBe(3);
    expect(bluetooth.datastream.length).toBe(1);
  });

  it('should listen to bluetooth events', () => {
    spyOn(bluetooth.events, 'subscribe').and.callFake(publishStub);
    bluetooth.listenToBluetoothEvents();
    expect(bluetooth.events.subscribe.calls.count()).toEqual(3);
  });

});