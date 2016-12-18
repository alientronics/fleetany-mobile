import { Login } from './login';
import { ComponentFixture, async }  from '@angular/core/testing';
import { TestUtils } from '../../test';

let fixture: ComponentFixture<Login> = null;
let instance: any = null;

describe('Login', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([Login]).then(compiled => {
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