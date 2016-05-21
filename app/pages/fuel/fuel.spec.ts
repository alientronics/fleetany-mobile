import { Fuel } from './fuel';
import { FormBuilder } from 'angular2/common';
import { Events, Platform, NavController }   from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'

let fuel: Fuel = null;

function postApiSuccessStub(options: any): any {
  'use strict';

  let watcher: Object = {
    subscribe: function(callback: any, error: any): void {
      return callback(); 
    }
  };
  return watcher;
}

function postApiErrorStub(options: any): any {
  'use strict';

  let watcher: Object = {
    subscribe: function(callback: any, error: any): void {
      return error('error'); 
    }
  };
  return watcher;
}

function showToastStub(message: string, title: string, nav: NavController): any {
  'use strict';
  return null;
}

describe('Fuel', () => {

  beforeEach(() => {     
    let events: Events = new Events();
    let platform: Platform = new Platform();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http, platform);
    spyOn(userData, 'showToast').and.callFake(showToastStub);
    fuel = new Fuel(new FormBuilder(), userData, null);
    let fb = new FormBuilder();
    fuel.fuelForm = fb.group({
        'type':     ['', ],
        'tankfill': ['', ]
    });
  });

  it('initialises', () => {
    expect(fuel).not.toBeNull();
  });

  it('should submit form', () => {
    let value: any = {};
    value.price = 12.34;
    value.amount = 12.34;
    value.miliage = 1234;
    value.type = 1;
    value.tankfill = 1;
    fuel.userData.plate = 1;
    spyOn(fuel.userData, 'postApi').and.callFake(postApiSuccessStub);
    fuel.onSubmit(value);
    expect(fuel.userData.postApi).toHaveBeenCalled();
    expect(fuel.userData.showToast).toHaveBeenCalled();
  });

  it('should ask for a vehicle', () => {
    let value: any = {};
    value.price = 12.34;
    value.amount = 12.34;
    value.miliage = 1234;
    value.type = 1;
    value.tankfill = 1;
    fuel.userData.plate = null;
    spyOn(fuel.userData, 'postApi').and.callFake(postApiSuccessStub);
    fuel.onSubmit(value);
    expect(fuel.userData.showToast).toHaveBeenCalled();
  });

  it('should throw error', () => {
    let value: any = {};
    value.price = 12.34;
    value.amount = 12.34;
    value.miliage = 1234;
    value.type = 1;
    value.tankfill = 1;
    fuel.userData.plate = 1;
    spyOn(fuel.userData, 'postApi').and.callFake(postApiErrorStub);
    fuel.onSubmit(value);
    expect(fuel.userData.showToast).toHaveBeenCalled();
  });

});