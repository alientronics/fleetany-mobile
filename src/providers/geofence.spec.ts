import { GeofenceProvider } from './geofence';
import { Events, Platform }  from 'ionic-angular';
import { StorageMock, UserDataMock } from '../mocks';

let instance: GeofenceProvider = null;

describe('GeofenceProvider', () => {

  beforeEach(() => {
    instance = new GeofenceProvider(
    			<any>new Events(), 
    			<any>new Platform(),
    			<any>new UserDataMock(),
    			<any>new StorageMock()
    		);
  });

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

});