import { Login } from './login';
import { GooglePlus } from 'ionic-native';
import { ComponentFixture, TestBed }  from '@angular/core/testing';
import { TestUtils } from '../../test';

let fixture: ComponentFixture<Login> = null;
let instance: any = null;
let login: Login = null;

class MockClass {
  public login(): any { return true; }
  public logout(): any { return true; }
}

function fakePromise(arg: any): any {
  'use strict';

  let promise: Object = {
    then: function(callback: any): void {
      return callback(""); 
    }
  };
  return promise;
}

describe('Login', () => {

  let login: Login;

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([Login]);
    fixture = TestBed.createComponent(Login);
    instance = fixture.debugElement.componentInstance;
  });

  beforeEach( (lg) => {
    spyOn(GooglePlus, 'login').and.callFake(fakePromise);
    spyOn(GooglePlus, 'logout').and.callFake(fakePromise);
    login = lg;
  });

  it('initialises', () => {
    expect(login).not.toBeNull();
  });

  it('initialises with no user logged', () => {
    expect(login['loggedIn']).toBe(false);
  });

  it('should watch user login when there is no plugin', () => {
    spyOn(login.platform, 'is').and.returnValue(false);
    login.googleLogin();
    expect(login['loggedIn']).toBe(true);
    expect(login['welcome']).not.toBeNull();
  });

  it('should call googleplus when there is plugin', () => {
    spyOn(login.platform, 'is').and.returnValue(true);
    login.googleLogin();
    expect(login['loggedIn']).toBe(true);
    expect(GooglePlus.login).toHaveBeenCalled();
  });

  it('should watch user logout when there is no plugin', () => {
    spyOn(login.platform, 'is').and.returnValue(false);
    login.googleLogout();
    expect(login['loggedIn']).toBe(false);
  });

  it('should call googleplus logout when there is plugin', () => {
    spyOn(login.platform, 'is').and.returnValue(true);
    login.googleLogout();
    expect(GooglePlus.logout).toHaveBeenCalled();
    expect(login['loggedIn']).toBe(false);
  });

});