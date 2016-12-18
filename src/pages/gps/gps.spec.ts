import { Gps } from './gps';
import { ComponentFixture, async }  from '@angular/core/testing';
import { TestUtils } from '../../test';

let fixture: ComponentFixture<Gps> = null;
let instance: any = null;

describe('Gps', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([Gps]).then(compiled => {
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

});