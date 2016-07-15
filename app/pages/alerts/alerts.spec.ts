import { Events, Platform } from 'ionic-angular';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { TranslateService, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Alerts } from './alerts';
import { UserData } from '../../providers/user-data';
import { AlertsProvider } from '../../providers/alerts';

let alerts: Alerts = null;

function publishStub(topic: string):any { return null; }

class MockClass {}

describe('Alerts', () => {

beforeEach(() => {      
  let mockClass: any = (<any>new MockClass());
  let platform: Platform = new Platform();
  let events: Events = new Events();
  let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
  let alertsProvider: AlertsProvider = new AlertsProvider(events, platform, mockClass);
  alertsProvider.setAlertsData(null);
  let translateLoad: TranslateLoader = new TranslateStaticLoader(http, 'assets/i18n', '.json');
  let translate: TranslateService = new TranslateService(http, translateLoad, null);
  alerts = new Alerts(translate, alertsProvider, events);
});

it('initialises', () => {
  expect(alerts).not.toBeNull();
});

it('should listen to alerts events', () => {
  spyOn(alerts.events, 'subscribe').and.callFake(publishStub);
  alerts.listenToAlertsEvents();
  expect(alerts.events.subscribe.calls.count()).toEqual(1);
});

});