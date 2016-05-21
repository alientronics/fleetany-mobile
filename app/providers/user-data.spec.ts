import { UserData } from './user-data';
import { Events, Platform, Alert } from 'ionic-angular';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'
import { Toast } from 'ionic-native';

let userData: UserData = null;

class MockClass {
  public json(): any { return true; }
  public present(): any { return true; }
}

function publishStub(topic: string):any { return false; }
function setStub(key: string, data:any):any { return true; }


function showStub(message: string, timeout: string, position: string):any {
  'use strict';

  let watcher: Object = {
    subscribe: function(callback: any, error: any): void {
      return callback('toast'); 
    }
  };
  return watcher;
}

function postApiStub(options: any): any {
  'use strict';

  let watcher: Object = {
    subscribe: function(callback: any, error: any): void {
      return callback(new MockClass()); 
    }
  };
  return watcher;
}

function createStub(options: any): any {
  'use strict';
  return true;
}

describe('UserData', () => {

  beforeEach(() => {
    let events: Events = new Events();
    let platform: Platform = new Platform();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    spyOn(events, 'publish').and.callFake(publishStub);
    userData = new UserData(events, http, platform);
  });

  it('initialises', () => {
    expect(userData).not.toBeNull();
  });

  it('should push event at login', () => {
    spyOn(userData, 'load').and.callFake(publishStub);
    userData.login({email:"null"});
    expect(userData.events.publish).toHaveBeenCalledWith('user:login');
  });

  it('should push event at logout', () => {
    userData.logout();
    expect(userData.data).toBeNull();
    expect(userData.events.publish).toHaveBeenCalledWith('user:logout');
  });

  it('should set storage at load', () => {
    this.data = null;
    spyOn(userData.storage, 'set').and.callFake(setStub);
    spyOn(userData, 'hasLoggedIn').and.callFake(publishStub);
    spyOn(userData, 'postApi').and.callFake(postApiStub);
    userData.load();
    expect(userData.storage.set).toHaveBeenCalled();
  });

  it('should call post at postApi', () => {
    spyOn(userData.http, 'post').and.callFake(publishStub);
    userData.postApi('',[]);
    expect(userData.http.post).toHaveBeenCalled();
  });

  it('should call Toast when cordova', () => {
    window.cordova = true;
    spyOn(Toast, 'show').and.callFake(showStub);
    userData.showToast('','',null);
    expect(Toast.show).toHaveBeenCalled();
  });

  it('should call Nav when not cordova', () => {
    window.cordova = false;
    spyOn(Alert, 'create').and.callFake(createStub);
    let nav = new MockClass();
    spyOn(nav, 'present').and.callFake(publishStub);
    userData.showToast('','',nav);
    expect(nav.present).toHaveBeenCalled();
  });

});