import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from '@angular/platform/testing/browser';
import { setBaseTestProviders } from '@angular/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { Platform, Events, MenuController }   from 'ionic-angular';
import { FleetanyApp } from './app';
import { UserData } from './providers/user-data';
import { AlertsProvider } from './providers/alerts';
import { GpsProvider } from './providers/gps';
import { BluetoothProvider } from './providers/bluetooth';
import { MockBackend } from '@angular/http/testing'
import { TranslateService, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';

class MockClass {}

// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

let fleetanyApp: FleetanyApp = null;

describe('FleetanyApp', () => {

  beforeEach(() => {
    let mockClass: any = (<any>new MockClass());
    let platform: Platform = new Platform();
    let events: Events = new Events();
    let menu: MenuController = new MenuController();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http, platform);
    let alertsProvider: AlertsProvider = new AlertsProvider(events, platform, mockClass);
    let translateLoad: TranslateLoader = new TranslateStaticLoader(http, 'assets/i18n', '.json');
    let translate: TranslateService = new TranslateService(http, translateLoad, null);
    fleetanyApp = new FleetanyApp(platform, events, userData, mockClass, alertsProvider, menu, translate);
  });

  it('initialises with a root page', () => {
    expect(fleetanyApp['rootPage']).not.toBe(null);
  });

  it('initialises with an app', () => {
    expect(fleetanyApp['app']).not.toBe(null);
  });

});