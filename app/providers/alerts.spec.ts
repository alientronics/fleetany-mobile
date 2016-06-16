import { Events, Platform, NavController } from 'ionic-angular';
import { UserData } from './user-data';
import { AlertsProvider } from './alerts';
import { GeofenceProvider } from './geofence';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'

let alertsProvider: AlertsProvider = null;

function publishStub(topic: string):any { return null; }

describe('AlertsProvider', () => {

  beforeEach(() => {   
    let events: Events = new Events();
    let platform: Platform = new Platform();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http, platform);
    let geofenceProvider: GeofenceProvider = new GeofenceProvider(events, platform, userData);
    spyOn(events, 'publish').and.callFake(publishStub); 
    alertsProvider = new AlertsProvider(events, platform, geofenceProvider);
  });

  it('initialises', () => {
    expect(alertsProvider).not.toBeNull();
  });

  it('should listen to geofence events', () => {
    spyOn(alertsProvider.events, 'subscribe').and.callFake(publishStub);
    alertsProvider.listenToGeofenceEvents();
    expect(alertsProvider.events.subscribe.calls.count()).toEqual(1);
  });
   
});