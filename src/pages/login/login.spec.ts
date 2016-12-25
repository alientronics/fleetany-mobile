import { Login } from './login';
import { ComponentFixture, async }  from '@angular/core/testing';
import { TestUtils } from '../../test';
import { GooglePlus } from 'ionic-native';
import { PromiseMock } from '../../mocks';

let fixture: ComponentFixture<Login> = null;
let instance: any = null;

describe('Login', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([Login]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    spyOn(GooglePlus, 'login').and.returnValue(new PromiseMock(''));
    spyOn(GooglePlus, 'logout').and.returnValue(new PromiseMock(''));
    fixture.detectChanges();
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

  it('should watch user login when there is no plugin', () => {
    spyOn(instance.platform, 'is').and.returnValue(false);
    instance.googleLogin();
    expect(instance['welcome']).not.toBeNull();
  });

  it('should call googleplus when there is plugin', () => {
    spyOn(instance.platform, 'is').and.returnValue(true);
    instance.googleLogin();
    expect(GooglePlus.login).toHaveBeenCalled();
  });

  it('should watch user logout when there is no plugin', () => {
    spyOn(instance.platform, 'is').and.returnValue(false);
    instance.googleLogout();
    expect(instance['loggedIn']).toBe(true);
  });

  it('should call googleplus logout when there is plugin', () => {
    spyOn(instance.platform, 'is').and.returnValue(true);
    instance.googleLogout();
    expect(GooglePlus.logout).toHaveBeenCalled();
    expect(instance['loggedIn']).toBe(true);
  });

});