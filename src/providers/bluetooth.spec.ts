import { BluetoothProvider } from './bluetooth';
import { Events, Platform }  from 'ionic-angular';
import { StorageMock, UserDataMock, GpsProviderMock, AlertControllerMock } from '../mocks';
import { BLE, BluetoothSerial } from 'ionic-native';

let instance: BluetoothProvider = null;

describe('BluetoothProvider', () => {

  beforeEach(() => {
    instance = new BluetoothProvider(
    			<any>new Events(), 
    			<any>new Platform(),
    			<any>new UserDataMock(),
    			<any>new GpsProviderMock(),
    			<any>new AlertControllerMock(),
    			<any>new StorageMock()
    		);
  });

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

  it('should call bleToggleBrowser and publish', () => {
    instance.userData.plate = 1;
    spyOn(instance, 'bleToggleBrowser').and.returnValue(true);
    spyOn(instance.events, 'publish').and.returnValue(true);
    instance.bleToggle(true);
    expect(instance.bleToggleBrowser).toHaveBeenCalled();
    expect(instance.events.publish).toHaveBeenCalled();
  });

  it('should call bleToggleBrowser and Storage', () => {
    instance.userData.plate = 1;
    spyOn(instance, 'bleToggleBrowser').and.returnValue(true);
    spyOn(instance.events, 'publish').and.returnValue(true);
    spyOn(instance.storage, 'set').and.returnValue(true);
    instance.bleToggle(false);
    expect(instance.bleToggleBrowser).toHaveBeenCalled();
    expect(instance.events.publish).toHaveBeenCalled();
    expect(instance.storage.set).toHaveBeenCalled();
  });

  it('should have devices', () => {
    instance.bleToggleBrowser(true);
    expect(instance.bledevice).toBeNull();
    expect(instance.devices.length).toBe(3);
  });

  it('should clear devices', () => {
    instance.bleToggleBrowser(false);
    expect(instance.devices.length).toBe(0);
  });

  it('should alert about no devices', () => {
    let promise: Object = {
      then: function(callback: any): void {
        return callback([]); 
      }
    };
    spyOn(BluetoothSerial, 'list').and.returnValue(promise);
    spyOn(instance.userData, 'showToast').and.returnValue(true);
    instance.bleToggleMobile(true);
    expect(instance.userData.showToast).toHaveBeenCalled();
  });

  it('should have ble devices', () => {
    let promise: Object = {
      then: function(callback: any): void {
        return callback([1,2,3]); 
      }
    };
    spyOn(BluetoothSerial, 'list').and.returnValue(promise);
    instance.bleToggleMobile(true);
    expect(instance.devices.length).toBe(3);
  });

  it('should unsubscribe ble', () => {
    instance.watcher = null;
    instance.bleToggleMobile(false);
    expect(instance.watcher).toBeNull();
  });

});