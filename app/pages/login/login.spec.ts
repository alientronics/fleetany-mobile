import { Login } from './login';
import { Events, Platform }   from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'

let login: Login = null;

class MockClass {}

describe('Login', () => {

  beforeEach(() => {
    let mockClass: any = (<any>new MockClass());
    let events: Events = new Events();
    let platform: Platform = new Platform();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http, platform);
    login = new Login(null, userData, events, platform, mockClass);

    // Mock Google Plus Plugin
    let googleplus = jasmine.createSpyObj('googleplus', ['isAvailable', 'login', 'logout']);
    googleplus.isAvailable.and.callFake( 
      (callback) => { 
        return callback(true); 
      } 
    );
    googleplus.login.and.callFake( 
      (options, cbSuccess, cbError) => { 
        let userObj = {
          imageUrl: 'mock.jpg',
          displayName: 'Mock Bar',
          email: 'mock@email.com',
        }
        return cbSuccess(userObj); 
      } 
    );
    googleplus.logout.and.callFake( 
      (callback) => { 
        return callback('logout successful'); 
      } 
    );
    let bgGeo = jasmine.createSpyObj('backgroundGeoLocation', ['configure', 'start', 'stop', 'finish']);
    window.plugins = {googleplus: googleplus, backgroundGeoLocation:  bgGeo};

  });

  it('initialises', () => {
    expect(login).not.toBeNull();
  });

  it('initialises with no user logged', () => {
    expect(login['loggedIn']).toBe(false);
  });

  it('should watch user login when there is no plugin', () => {
    window.plugins = null;
    login.googleLogin();
    expect(login['loggedIn']).toBe(true);
    expect(login['userImage']).toBe('https://github.com/identicons/jasonlong.png');
    expect(login['welcome']).not.toBeNull();
  });

  it('should call googleplus when there is plugin', () => {
    login.googleLogin();
    expect(window.plugins.googleplus.isAvailable).toHaveBeenCalled();
    expect(window.plugins.googleplus.login).toHaveBeenCalled();
    expect(login['userImage']).toBe('mock.jpg');
    expect(login['loggedIn']).toBe(true);
  });

  it('should watch user logout when there is no plugin', () => {
    window.plugins = null;
    login.googleLogout();
    expect(login['loggedIn']).toBe(false);
  });

  it('should call googleplus logout when there is plugin', () => {
    login.googleLogout();
    expect(login['loggedIn']).toBe(false);
    expect(login['userImage']).toBe('');
  });

});