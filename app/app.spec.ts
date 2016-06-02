import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { Http, BaseRequestOptions } from 'angular2/http';
import { Platform, Events, MenuController }   from 'ionic-angular';
import { FleetanyApp }           from './app';
import { UserData } from './providers/user-data';
import { MockBackend } from 'angular2/http/testing'


// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

let fleetanyApp: FleetanyApp = null;

describe('FleetanyApp', () => {

  beforeEach(() => {
    let platform: Platform = new Platform();
    let events: Events = new Events();
    let menu: MenuController = new MenuController();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http, platform);
    fleetanyApp = new FleetanyApp(platform, events, userData, menu);
  });

  it('initialises with a root page', () => {
    expect(fleetanyApp['rootPage']).not.toBe(null);
  });

  it('initialises with an app', () => {
    expect(fleetanyApp['app']).not.toBe(null);
  });

});