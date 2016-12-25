import { GeofenceProvider } from './geofence';
import { Events, Platform }  from 'ionic-angular';
import { StorageMock, UserDataMock, PromiseMock } from '../mocks';

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

  it('should listen to userData events', () => {
    spyOn(instance.platform, 'is').and.returnValue(true);
    spyOn(instance.events, 'subscribe').and.returnValue(null);
    instance.listenToUserDataEvents();
    expect(instance.events.subscribe).toHaveBeenCalled();
  });
   
  it('should clear storage', () => {
    spyOn(instance.storage, 'set').and.callThrough();
    instance.setGeofenceData(null);
    expect(instance.storage.set).toHaveBeenCalled();
  });

  it('should set data to storage', () => {
    spyOn(instance.storage, 'get').and.returnValue(new PromiseMock('[{}]'));
    spyOn(instance.storage, 'set').and.callThrough();
    instance.setGeofenceData(JSON.stringify({
            id:             "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb",
            latitude:       50.2980049,
            longitude:      18.6593152,
            radius:         3000,
            transitionType: 2}));
    expect(instance.storage.set).toHaveBeenCalled();
  });

  it('should publish event', () => {
    spyOn(instance.platform, 'is').and.returnValue(false);
    spyOn(instance.userData, 'getPlate').and.callThrough();
    instance.events.publish('user:changeplate');
    expect(instance.platform.is).toHaveBeenCalled();
  });

  it('should get storage', () => {
    spyOn(instance.storage, 'get').and.callThrough();
    instance.getGeofenceData();
    expect(instance.storage.get).toHaveBeenCalled();
  });

});