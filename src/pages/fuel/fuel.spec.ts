import { Fuel } from './fuel';
import { ComponentFixture, async }  from '@angular/core/testing';
import { TestUtils } from '../../test';

let fixture: ComponentFixture<Fuel> = null;
let instance: any = null;

describe('Fuel', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([Fuel]).then(compiled => {
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