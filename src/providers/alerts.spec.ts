import { AlertsProvider } from './alerts';
import { Events }  from 'ionic-angular';
import { GeofenceProviderMock, StorageMock } from '../mocks';

let instance: AlertsProvider = null;

describe('AlertsProvider', () => {

  beforeEach(() => {
    instance = new AlertsProvider(<any>new Events(), <any>new GeofenceProviderMock(), <any>new StorageMock());
  });

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

  it('should listen to geofence events', () => {
    spyOn(instance.events, 'subscribe').and.callThrough();
    instance.listenToGeofenceEvents();
    expect(instance.events.subscribe).toHaveBeenCalled();
  });

});