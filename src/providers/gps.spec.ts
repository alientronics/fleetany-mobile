import { GpsProvider } from './gps';
import { Events, Platform }  from 'ionic-angular';
import { StorageMock, UserDataMock, AlertControllerMock } from '../mocks';

let instance: GpsProvider = null;

describe('GpsProvider', () => {

  beforeEach(() => {
    instance = new GpsProvider(
    			<any>new Events(), 
    			<any>new Platform(),
    			<any>new UserDataMock(),
    			<any>new AlertControllerMock(),
    			<any>new StorageMock()
    		);
  });

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

});