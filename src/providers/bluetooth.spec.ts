import { BluetoothProvider } from './bluetooth';
import { Events, Platform }  from 'ionic-angular';
import { StorageMock, UserDataMock, GpsProviderMock, AlertControllerMock } from '../mocks';

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

});