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
    expect(bluetoothProvider).not.toBeNull();
  });

  it('should ask for a vehicle', () => {
    bluetoothProvider.userData.plate = null;
    bluetoothProvider.bleToggle(true);
    expect(bluetoothProvider.userData.showToast).toHaveBeenCalled();
  });

  it('should call bleToggleBrowser', () => {
    bluetoothProvider.userData.plate = 1;
    spyOn(bluetoothProvider, 'bleToggleBrowser').and.callFake(bleToggleStub);
    bluetoothProvider.bleToggle(true);
    expect(bluetoothProvider.bleToggleBrowser).toHaveBeenCalled();
    expect(bluetoothProvider.events.publish).toHaveBeenCalled();
  });

  it('should have devices', () => {
    bluetoothProvider.bleToggleBrowser(true);
    expect(bluetoothProvider.bledevice).toBeNull();
    expect(bluetoothProvider.devices.length).toBe(3);
  });

  it('should clear devices', () => {
    bluetoothProvider.bleToggleBrowser(false);
    expect(bluetoothProvider.devices.length).toBe(0);
  });

  it('should alert about no devices', () => {
    spyOn(BluetoothSerial, 'list').and.callFake(listFalseStub);
    bluetoothProvider.bleToggleMobile(true);
    expect(bluetoothProvider.userData.showToast).toHaveBeenCalled();
  });

  it('should have ble devices', () => {
    spyOn(BluetoothSerial, 'list').and.callFake(listTrueStub);
    bluetoothProvider.bleToggleMobile(true);
    expect(bluetoothProvider.devices.length).toBe(3);
  });

  it('should unsubscribe ble', () => {
    bluetoothProvider.watcher = new MockClass();
    bluetoothProvider.bleToggleMobile(false);
    expect(bluetoothProvider.watcher).toBeNull();
  });

  it('should disconnect ble device', () => {
    bluetooth.bledevice = "device";
    bluetooth.datastream = [];
    bluetooth.devices = [];
    spyOn(BLE, 'disconnect').and.callFake(listFalseStub);
    spyOn(BLE, 'startScan').and.callFake(startScanStub);
    spyOn(BLE, 'stopScan').and.callFake(listFalseStub);
    bluetoothProvider.bleToggleMobile(true);
    expect(BLE.disconnect).toHaveBeenCalled();
    expect(bluetooth.datastream.length).toBe(2);
    expect(bluetooth.devices.length).toBe(1);
  });

  it('should stop ble scan', () => {
    bluetoothProvider.datastream = [];
    spyOn(BLE, 'stopScan').and.callFake(listFalseStub);
    bluetoothProvider.bleToggleMobileBLE(false);
    expect(bluetoothProvider.datastream.length).toBe(1);
  });

  it('should send data to datastream', () => {
    bluetoothProvider.datastream = [];
    bluetoothProvider.sendData();
    expect(bluetoothProvider.datastream.length).toBe(2);
  });

  it('should send data to datastream ok', () => {
    spyOn(bluetoothProvider.platform, 'is').and.callFake(isStub);
    spyOn(BluetoothSerial, 'isConnected').and.callFake(listTrueStub);
    spyOn(BluetoothSerial, 'write').and.callFake(writeStub);
    bluetoothProvider.datastream = [];
    bluetoothProvider.sendData();
    expect(bluetoothProvider.datastream.length).toBe(2);
  });

  it('should fake device data', () => {
    spyOn(bluetoothProvider, 'setBluetoothData').and.callFake(isStub);
    bluetoothProvider.bledeviceChanged('deviceMac');
    expect(bluetoothProvider.datastream.length).toBe(1);
    expect(bluetoothProvider.setBluetoothData).toHaveBeenCalled();
  });

  it('should subscribe device', () => {
    spyOn(bluetoothProvider.platform, 'is').and.callFake(isStub);
    spyOn(BluetoothSerial, 'connect').and.callFake(listTrueStub);
    spyOn(BluetoothSerial, 'subscribe').and.callFake(startScanStub);
    spyOn(bluetoothProvider, 'setBluetoothData').and.callFake(isStub);
    bluetoothProvider.bledeviceChanged('deviceMac');
    expect(bluetoothProvider.datastream.length).toBe(2);
    expect(bluetoothProvider.setBluetoothData).toHaveBeenCalled();
  });

});