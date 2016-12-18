import { Alerts } from './alerts';
import { ComponentFixture, async }  from '@angular/core/testing';
import { TestUtils } from '../../test';

export function publishStub(topic: string):any { return null; }

let fixture: ComponentFixture<Alerts> = null;
let instance: any = null;

describe('Alerts', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([Alerts]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    fixture.detectChanges();
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

  it('should listen to alerts events', () => {
    spyOn(instance.events, 'subscribe').and.callFake(publishStub);
    instance.listenToAlertsEvents();
    expect(instance.events.subscribe).toHaveBeenCalled();
  });

});