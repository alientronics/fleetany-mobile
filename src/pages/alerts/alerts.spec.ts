import { Platform } from 'ionic-angular';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { TranslateService, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Alerts } from './alerts';
import { UserData } from '../../providers/user-data';
import { AlertsProvider } from '../../providers/alerts';
import { GeofenceProvider } from '../../providers/geofence';
import { ComponentFixture, TestBed }  from '@angular/core/testing';
import { TestUtils } from '../../test';

function publishStub(topic: string):any { return null; }

let fixture: ComponentFixture<Alerts> = null;
let instance: any = null;

describe('Alerts', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([AlertsProvider, GeofenceProvider, Alerts]);
    fixture = TestBed.createComponent(Alerts);
    instance = fixture.debugElement.componentInstance;
  });

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

  it('should listen to alerts events', () => {
    spyOn(instance.events, 'subscribe').and.callFake(publishStub);
    instance.listenToAlertsEvents();
    expect(instance.events.subscribe.calls.count()).toEqual(1);
  });

});