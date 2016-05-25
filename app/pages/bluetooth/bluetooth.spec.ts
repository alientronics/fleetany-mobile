import { Bluetooth } from './bluetooth';
import { BLE, BluetoothSerial } from 'ionic-native';
import { Events, Platform, NavController }   from 'ionic-angular';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'
import { UserData } from '../../providers/user-data';

let bluetooth: Bluetooth = null;

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
    let platform: Platform = new Platform();
    let events: Events = new Events();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http, platform);
    spyOn(userData, 'showToast').and.callFake(showToastStub);
    spyOn(events, 'publish').and.callFake(publishStub);
    bluetooth = new Bluetooth(userData, platform, events, mockClass);
  });

  it('initialises', () => {
    expect(bluetooth).not.toBeNull();
  });

  it('should ask for a vehicle', () => {
    bluetooth.userData.plate = null;
    bluetooth.bleToggle(true);
    expect(bluetooth.userData.showToast).toHaveBeenCalled();
  });

  it('should call bleToggleBrowser', () => {
    bluetooth.userData.plate = 1;
    spyOn(bluetooth, 'bleToggleBrowser').and.callFake(bleToggleStub);
    bluetooth.bleToggle(true);
    expect(bluetooth.bleToggleBrowser).toHaveBeenCalled();
    expect(bluetooth.events.publish).toHaveBeenCalled();
  });

  it('should have devices', () => {
    bluetooth.bleToggleBrowser(true);
    expect(bluetooth.bledevice).toBeNull();
    expect(bluetooth.devices.length).toBe(3);
  });

  it('should clear devices', () => {
    bluetooth.bleToggleBrowser(false);
    expect(bluetooth.devices.length).toBe(0);
  });

  it('should alert about no devices', () => {
    spyOn(BluetoothSerial, 'list').and.callFake(listFalseStub);
    bluetooth.bleToggleMobile(true);
    expect(bluetooth.userData.showToast).toHaveBeenCalled();
  });

  it('should have ble devices', () => {
    spyOn(BluetoothSerial, 'list').and.callFake(listTrueStub);
    bluetooth.bleToggleMobile(true);
    expect(bluetooth.devices.length).toBe(3);
  });

  it('should unsubscribe ble', () => {
    bluetooth.watcher = new MockClass();
    bluetooth.bleToggleMobile(false);
    expect(bluetooth.watcher).toBeNull();
  });

  it('should disconnect ble device', () => {
    bluetooth.bledevice = "device";
    bluetooth.datastream = [];
    bluetooth.devices = [];
    spyOn(BLE, 'disconnect').and.callFake(listFalseStub);
    spyOn(BLE, 'startScan').and.callFake(startScanStub);
    spyOn(BLE, 'stopScan').and.callFake(listFalseStub);
    bluetooth.bleToggleMobileBLE(true);
    expect(BLE.disconnect).toHaveBeenCalled();
    expect(bluetooth.datastream.length).toBe(2);
    expect(bluetooth.devices.length).toBe(1);
  });

  it('should stop ble scan', () => {
    bluetooth.datastream = [];
    spyOn(BLE, 'stopScan').and.callFake(listFalseStub);
    bluetooth.bleToggleMobileBLE(false);
    expect(bluetooth.datastream.length).toBe(1);
  });

  it('should send data to datastream', () => {
    bluetooth.datastream = [];
    bluetooth.sendData();
    expect(bluetooth.datastream.length).toBe(2);
  });

  it('should send data to datastream ok', () => {
    spyOn(bluetooth.platform, 'is').and.callFake(isStub);
    spyOn(BluetoothSerial, 'isConnected').and.callFake(listTrueStub);
    spyOn(BluetoothSerial, 'write').and.callFake(writeStub);
    bluetooth.datastream = [];
    bluetooth.sendData();
    expect(bluetooth.datastream.length).toBe(2);
  });

  it('should fake device data', () => {
    spyOn(bluetooth.userData, 'setBluetoothData').and.callFake(isStub);
    bluetooth.bledeviceChanged('deviceMac');
    expect(bluetooth.datastream.length).toBe(1);
    expect(bluetooth.userData.setBluetoothData).toHaveBeenCalled();
  });

  it('should subscribe device', () => {
    spyOn(bluetooth.platform, 'is').and.callFake(isStub);
    spyOn(BluetoothSerial, 'connect').and.callFake(listTrueStub);
    spyOn(BluetoothSerial, 'subscribe').and.callFake(startScanStub);
    spyOn(bluetooth.userData, 'setBluetoothData').and.callFake(isStub);
    bluetooth.bledeviceChanged('deviceMac');
    expect(bluetooth.datastream.length).toBe(2);
    expect(bluetooth.userData.setBluetoothData).toHaveBeenCalled();
  });

});