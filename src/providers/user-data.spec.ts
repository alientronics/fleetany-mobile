import { UserData } from './user-data';
import { Events, Platform, Alert } from 'ionic-angular';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { Toast } from 'ionic-native';
import { ComponentFixture, TestBed }  from '@angular/core/testing';
import { TestUtils } from '../test';

let fixture: ComponentFixture<UserData> = null;
let instance: any = null;
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
    TestUtils.configureIonicTestingModule([UserData]);
    fixture = TestBed.createComponent(UserData);
    userData = fixture.debugElement.componentInstance;
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
    spyOn(userData.platform, 'is').and.returnValue(true);
    spyOn(Toast, 'show').and.callFake(showStub);
    userData.showToast('','',null);
    expect(Toast.show).toHaveBeenCalled();
  });

  it('should call Nav when not cordova', () => {
    spyOn(userData.platform, 'is').and.returnValue(false);
    spyOn(Alert, 'create').and.callFake(createStub);
    let nav = new MockClass();
    spyOn(nav, 'present').and.callFake(publishStub);
    userData.showToast('','',nav);
    expect(nav.present).toHaveBeenCalled();
  });

});