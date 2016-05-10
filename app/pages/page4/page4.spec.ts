import { Page4 } from './page4';
import { BLE, BluetoothSerial } from 'ionic-native';
import { Events, Platform, NavController }   from 'ionic-angular';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'
import { UserData } from '../../providers/user-data';

let page4: Page4 = null;

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

function startScanStub(options: any): any {
  'use strict';

  let watcher: Object = {
    subscribe: function(callback: any, error: any): void {
      return callback(new MockClass());  
    }
  };
  return watcher;
}

describe('Page4', () => {

  beforeEach(() => {   
    let mockClass: any = (<any>new MockClass());
    let platform: Platform = new Platform();
    let events: Events = new Events();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http);
    spyOn(userData, 'showToast').and.callFake(showToastStub);
    spyOn(events, 'publish').and.callFake(publishStub);
    page4 = new Page4(userData, platform, events, mockClass);
  });

  it('initialises', () => {
    expect(page4).not.toBeNull();
  });

  it('should ask for a vehicle', () => {
    page4.userData.plate = null;
    page4.bleToggle(true);
    expect(page4.userData.showToast).toHaveBeenCalled();
  });

  it('should call bleToggleBrowser', () => {
    page4.userData.plate = 1;
    spyOn(page4, 'bleToggleBrowser').and.callFake(bleToggleStub);
    page4.bleToggle(true);
    expect(page4.bleToggleBrowser).toHaveBeenCalled();
    expect(page4.events.publish).toHaveBeenCalled();
  });

  it('should have devices', () => {
    page4.bleToggleBrowser(true);
    expect(page4.bledevice).toBeNull();
    expect(page4.devices.length).toBe(3);
  });

  it('should clear devices', () => {
    page4.bleToggleBrowser(false);
    expect(page4.devices.length).toBe(0);
  });

  it('should alert about no devices', () => {
    spyOn(BluetoothSerial, 'list').and.callFake(listFalseStub);
    page4.bleToggleMobile(true);
    expect(page4.userData.showToast).toHaveBeenCalled();
  });

  it('should have ble devices', () => {
    spyOn(BluetoothSerial, 'list').and.callFake(listTrueStub);
    page4.bleToggleMobile(true);
    expect(page4.devices.length).toBe(3);
  });

  it('should unsubscribe ble', () => {
    page4.watcher = new MockClass();
    page4.bleToggleMobile(false);
    expect(page4.watcher).toBeNull();
  });

  it('should disconnect ble device', () => {
    page4.bledevice = "device";
    page4.datastream = [];
    page4.devices = [];
    spyOn(BLE, 'disconnect').and.callFake(listFalseStub);
    spyOn(BLE, 'startScan').and.callFake(startScanStub);
    spyOn(BLE, 'stopScan').and.callFake(listFalseStub);
    page4.bleToggleMobileBLE(true);
    expect(BLE.disconnect).toHaveBeenCalled();
    expect(page4.datastream.length).toBe(2);
    expect(page4.devices.length).toBe(1);
  });

  it('should stop ble scan', () => {
    page4.datastream = [];
    spyOn(BLE, 'stopScan').and.callFake(listFalseStub);
    page4.bleToggleMobileBLE(false);
    expect(page4.datastream.length).toBe(1);
  });

  it('should send data to datastream', () => {
    page4.datastream = [];
    page4.sendData();
    expect(page4.datastream.length).toBe(1);
  });

  it('should send data to datastream', () => {
    spyOn(page4.platform, 'is').and.callFake(isStub);
    spyOn(BluetoothSerial, 'isConnected').and.callFake(listTrueStub);
    spyOn(BluetoothSerial, 'write').and.callFake(listTrueStub);
    page4.datastream = [];
    page4.sendData();
    expect(page4.datastream.length).toBe(1);
  });

  it('should fake device data', () => {
    spyOn(page4.userData, 'setBluetoothData').and.callFake(isStub);
    page4.bledeviceChanged('deviceMac');
    expect(page4.datastream.length).toBe(1);
    expect(page4.userData.setBluetoothData).toHaveBeenCalled();
  });

  it('should subscribe device', () => {
    spyOn(page4.platform, 'is').and.callFake(isStub);
    spyOn(BluetoothSerial, 'connect').and.callFake(listTrueStub);
    spyOn(BluetoothSerial, 'subscribe').and.callFake(startScanStub);
    spyOn(page4.userData, 'setBluetoothData').and.callFake(isStub);
    page4.bledeviceChanged('deviceMac');
    expect(page4.datastream.length).toBe(2);
    expect(page4.userData.setBluetoothData).toHaveBeenCalled();
  });

});