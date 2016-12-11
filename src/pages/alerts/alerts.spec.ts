import { Http, BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { TranslateService, TranslateStaticLoader, TranslateLoader, TranslateModule } from 'ng2-translate/ng2-translate';
import { Alerts } from './alerts';
import { UserData } from '../../providers/user-data';
import { AlertsProvider } from '../../providers/alerts';
import { GeofenceProvider } from '../../providers/geofence';
import { ComponentFixture, TestBed, async }  from '@angular/core/testing';
import { TestUtils } from '../../test';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, Events, IonicModule }  from 'ionic-angular';

import { ConfigMock, NavMock, PlatformMock, AlertsProviderMock } from '../../mocks';
import { BrowserModule } from "@angular/platform-browser";

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export function publishStub(topic: string):any { return null; }

let fixture: ComponentFixture<Alerts> = null;
let instance: any = null;

describe('Alerts', () => {

  //beforeEach(() => {
  //  TestUtils.configureIonicTestingModule([Alerts]);
  //  fixture = TestBed.createComponent(Alerts);
  //  instance = fixture.debugElement.componentInstance;
  //});

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [Alerts],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, Events,
        {provide: Config, useClass: ConfigMock},
        {provide: AlertsProvider, useClass: AlertsProviderMock},
      ],
      imports: [
        IonicModule,
        BrowserModule,
        HttpModule,
        TranslateModule.forRoot({ 
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
        }),
      ],
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(Alerts);
      instance = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });//

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

  it('should listen to alerts events', () => {
    spyOn(instance.events, 'subscribe').and.callFake(publishStub);
    instance.listenToAlertsEvents();
    expect(instance.events.subscribe).toHaveBeenCalled();
  });

});