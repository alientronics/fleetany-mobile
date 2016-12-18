import { Bluetooth } from './bluetooth';
import { ComponentFixture, async }  from '@angular/core/testing';
import { TestUtils } from '../../test';

let fixture: ComponentFixture<Bluetooth> = null;
let instance: any = null;

describe('Bluetooth', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([Bluetooth]).then(compiled => {
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