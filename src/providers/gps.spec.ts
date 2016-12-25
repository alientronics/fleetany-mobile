import { GpsProvider } from './gps';
import { Events, Platform }  from 'ionic-angular';
import { StorageMock, UserDataMock, AlertControllerMock, MockClass, WatcherMock, PromiseMock } from '../mocks';
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

  it('should set Display data', () => {
    spyOn(instance, 'getGpsCurrentData').and.returnValue(new PromiseMock('[{\"latitude\":1,\"longitude\":0,\"gpstracking\":0}]'));
    instance.setDisplayData();
    expect(instance.getGpsCurrentData).toHaveBeenCalled();
  });

  it('should get storage', () => {
    spyOn(instance.storage, 'get').and.callThrough();
    instance.getPostData('');
    expect(instance.storage.get).toHaveBeenCalled();
  });

  it('should call event', () => {
    spyOn(instance.storage, 'remove').and.callThrough();
    instance.events.publish('user:logout');
    expect(instance.storage.remove).toHaveBeenCalled();
  });

});