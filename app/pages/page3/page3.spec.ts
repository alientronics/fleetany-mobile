import { Page3 } from './page3';
import { FormBuilder } from 'angular2/common';
import { Events, NavController }   from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'

let page3: Page3 = null;

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

describe('Page3', () => {

  beforeEach(() => {     
    let events: Events = new Events();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http);
    spyOn(userData, 'showToast').and.callFake(showToastStub);
    page3 = new Page3(new FormBuilder(), userData, null);
    let fb = new FormBuilder();
    page3.fuelForm = fb.group({
        'type':     ['', ],
        'tankfill': ['', ]
    });
  });

  it('initialises', () => {
    expect(page3).not.toBeNull();
  });

  it('should submit form', () => {
    let value: any = {};
    value.price = 12.34;
    value.amount = 12.34;
    value.miliage = 1234;
    value.type = 1;
    value.tankfill = 1;
    page3.userData.plate = 1;
    spyOn(page3.userData, 'postApi').and.callFake(postApiSuccessStub);
    page3.onSubmit(value);
    expect(page3.userData.postApi).toHaveBeenCalled();
    expect(page3.userData.showToast).toHaveBeenCalled();
  });

  it('should ask for a vehicle', () => {
    let value: any = {};
    value.price = 12.34;
    value.amount = 12.34;
    value.miliage = 1234;
    value.type = 1;
    value.tankfill = 1;
    page3.userData.plate = null;
    spyOn(page3.userData, 'postApi').and.callFake(postApiSuccessStub);
    page3.onSubmit(value);
    expect(page3.userData.showToast).toHaveBeenCalled();
  });

  it('should throw error', () => {
    let value: any = {};
    value.price = 12.34;
    value.amount = 12.34;
    value.miliage = 1234;
    value.type = 1;
    value.tankfill = 1;
    page3.userData.plate = 1;
    spyOn(page3.userData, 'postApi').and.callFake(postApiErrorStub);
    page3.onSubmit(value);
    expect(page3.userData.showToast).toHaveBeenCalled();
  });

});