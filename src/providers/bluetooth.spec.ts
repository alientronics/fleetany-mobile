import { BluetoothProvider } from './bluetooth';
import { Events, Platform }  from 'ionic-angular';
import { StorageMock, UserDataMock, GpsProviderMock, AlertControllerMock, 
         MockClass, PromiseMock, WatcherMock } from '../mocks';
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
    spyOn(BluetoothSerial, 'list').and.returnValue(new PromiseMock([]));
    spyOn(instance.userData, 'showToast').and.returnValue(true);
    instance.bleToggleMobile(true);
    expect(instance.userData.showToast).toHaveBeenCalled();
  });

  it('should have ble devices', () => {
    spyOn(BluetoothSerial, 'list').and.returnValue(new PromiseMock([1,2,3]));
    instance.bleToggleMobile(true);
    expect(instance.devices.length).toBe(3);
  });

  it('should unsubscribe ble', () => {
    instance.watcher = null;
    instance.bleToggleMobile(false);
    expect(instance.watcher).toBeNull();
  });

  it('should disconnect ble device', () => {
    instance.bledevice = "device";
    instance.datastream = [];
    instance.devices = [];
    spyOn(BLE, 'disconnect').and.returnValue(new PromiseMock([]));
    spyOn(BLE, 'startScan').and.returnValue(new WatcherMock(new MockClass(),false));
    spyOn(BLE, 'stopScan').and.returnValue(new PromiseMock([]));
    instance.bleToggleMobileBLE(true);
    expect(BLE.disconnect).toHaveBeenCalled();
    expect(instance.datastream.length).toBe(2);
    expect(instance.devices.length).toBe(1);
  });

  it('should stop ble scan', () => {
    instance.datastream = [];
    spyOn(BLE, 'stopScan').and.returnValue(new PromiseMock([]));
    instance.bleToggleMobileBLE(false);
    expect(instance.datastream.length).toBe(1);
  });

  it('should send data to datastream', () => {
    instance.datastream = [];
    spyOn(instance, 'setBluetoothData').and.returnValue(true);
    instance.sendData();
    expect(instance.datastream.length).toBe(2);
  });

  it('should send data to datastream ok', () => {
    spyOn(instance.platform, 'is').and.returnValue(true);
    spyOn(BluetoothSerial, 'isConnected').and.returnValue(new PromiseMock([1,2,3]));
    spyOn(BluetoothSerial, 'write').and.returnValue(new PromiseMock({}));
    instance.datastream = [];
    spyOn(instance, 'setBluetoothData').and.returnValue(true);
    instance.sendData();
    expect(instance.datastream.length).toBe(2);
  });

  it('should fake device data', () => {
    spyOn(instance, 'setBluetoothData').and.returnValue(true);
    spyOn(BluetoothSerial, 'isConnected').and.returnValue(new PromiseMock([1,2,3]));
    instance.bledeviceChanged('deviceMac');
    expect(instance.datastream.length).toBe(1);
    expect(instance.setBluetoothData).toHaveBeenCalled();
  });

  it('should subscribe device', () => {
    spyOn(instance.platform, 'is').and.returnValue(true);
    spyOn(BluetoothSerial, 'isConnected').and.returnValue(new PromiseMock([1,2,3]));
    spyOn(BluetoothSerial, 'subscribe').and.returnValue(new WatcherMock(new MockClass(),false));
    spyOn(instance, 'setBluetoothData').and.returnValue(true);
    instance.bledeviceChanged('deviceMac');
    expect(instance.datastream.length).toBe(2);
    expect(instance.setBluetoothData).toHaveBeenCalled();
  });

  it('should listen to userData events', () => {
    spyOn(instance.events, 'subscribe').and.returnValue(true);
    instance.listenToUserDataEvents();
    instance.userData.logout();
    expect(instance.events.subscribe).toHaveBeenCalled();
  });

});