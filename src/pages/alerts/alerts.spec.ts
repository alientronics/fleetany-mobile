import { Platform } from 'ionic-angular';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { TranslateService, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Alerts } from './alerts';
import { UserData } from '../../providers/user-data';
import { AlertsProvider } from '../../providers/alerts';
import { GeofenceProvider } from '../../providers/geofence';
import { beforeEachProviders, describe, expect, inject, it } from '@angular/core/testing';
import { providers }   from '../../../test/diExports';

function publishStub(topic: string):any { return null; }

describe('Alerts', () => {

  beforeEachProviders(() => providers);
  beforeEachProviders(() => [
    AlertsProvider,
    GeofenceProvider,
    Alerts
  ]);

  it('initialises', inject([ Alerts ], (alerts) => {
    expect(alerts).not.toBeNull();
  }));

  it('should listen to alerts events', inject([ Alerts ], (alerts) => {
    spyOn(alerts.events, 'subscribe').and.callFake(publishStub);
    alerts.listenToAlertsEvents();
    expect(alerts.events.subscribe.calls.count()).toEqual(1);
  }));

});