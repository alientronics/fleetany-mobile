import { Events, Platform } from 'ionic-angular';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'
import { TranslateService, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Alerts } from './alerts';
import { UserData } from '../../providers/user-data';
import { AlertsProvider } from '../../providers/alerts';

let alerts: Alerts = null;

class MockClass {}

describe('Alerts', () => {

beforeEach(() => {      
  let mockClass: any = (<any>new MockClass());
  let platform: Platform = new Platform();
  let events: Events = new Events();
  let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
  let alertsProvider: AlertsProvider = new AlertsProvider(events, platform, mockClass);
  let translateLoad: TranslateLoader = new TranslateStaticLoader(http, 'assets/i18n', '.json');
  let translate: TranslateService = new TranslateService(http, translateLoad, null);
  alerts = new Alerts(translate, alertsProvider, events);
});

it('initialises', () => {
  expect(alerts).not.toBeNull();
});

});