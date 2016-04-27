import { Page1 } from './page1';
import { Events, Platform }   from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'

let page1: Page1 = null;

describe('Page1', () => {

  beforeEach(() => {
    let events: Events = new Events();
    let platform: Platform = new Platform();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http);
    page1 = new Page1(null, userData, events, platform);

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
    expect(page1).not.toBeNull();
  });

  it('initialises with no user logged', () => {
    expect(page1['loggedIn']).toBe(false);
  });

  it('should watch user login when there is no plugin', () => {
    window.plugins = null;
    page1.googleLogin();
    expect(page1['loggedIn']).toBe(true);
    expect(page1['userImage']).toBe('https://github.com/identicons/jasonlong.png');
    expect(page1['welcome']).not.toBeNull();
  });

  it('should call googleplus when there is plugin', () => {
    page1.googleLogin();
    expect(window.plugins.googleplus.isAvailable).toHaveBeenCalled();
    expect(window.plugins.googleplus.login).toHaveBeenCalled();
    expect(page1['userImage']).toBe('mock.jpg');
    expect(page1['loggedIn']).toBe(true);
  });

  it('should watch user logout when there is no plugin', () => {
    window.plugins = null;
    page1.googleLogout();
    expect(page1['loggedIn']).toBe(false);
  });

  it('should call googleplus logout when there is plugin', () => {
    page1.googleLogout();
    expect(page1['loggedIn']).toBe(false);
    expect(page1['userImage']).toBe('');
  });

});