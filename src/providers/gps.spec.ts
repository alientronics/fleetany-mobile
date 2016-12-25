import { GpsProvider } from './gps';
import { Events, Platform }  from 'ionic-angular';
import { StorageMock, UserDataMock, AlertControllerMock, MockClass, WatcherMock } from '../mocks';
import {Geolocation} from 'ionic-native';

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
    spyOn(instance.userData, 'showToast').and.callThrough();
    spyOn(instance.events, 'publish').and.callThrough();
    let data = { 
      coords: { 
        latitude: 30.03,
        longitude: 51.22,
      }
    }
    spyOn(Geolocation, 'watchPosition').and.returnValue(new WatcherMock(data,false));
  });

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

  it('should ask for a vehicle', () => {
    instance.userData.plate = null;
    instance.gpsToggle(true);
    expect(instance.userData.showToast).toHaveBeenCalled();
  });
  
  it('should start gps tracking', () => {
    instance.userData.plate = 1;
    instance.gpsToggle(true);
    expect(Geolocation.watchPosition).toHaveBeenCalled();
  });
  
  it('should start gps tracking with empty data', () => {
    instance.userData.plate = 1;
    instance.setGpsData(null);
    instance.gpsToggle(true);
    expect(Geolocation.watchPosition).toHaveBeenCalled();
  });

  it('should subscribe gps location', () => {
    instance.gpsToggle(true);
  });

  it('should unsubscribe watcher', () => {
    instance.watcher = new MockClass();
    instance.userData.plate = 1;
    instance.gpsToggle(false);
    expect(instance.watcher).toBeNull();
  });

  it('should listen to userData events', () => {
    spyOn(instance.events, 'subscribe').and.returnValue(true);
    instance.listenToUserDataEvents();
    instance.userData.logout();
    expect(instance.events.subscribe).toHaveBeenCalled();
  });

});