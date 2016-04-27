import { Page3 } from './page3';
import { FormBuilder } from 'angular2/common';
import { Events }   from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'

let page3: Page3 = null;

describe('Page3', () => {

  beforeEach(() => {     
    let events: Events = new Events();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http);
    page3 = new Page3(new FormBuilder(), userData, null);
  });

  it('initialises', () => {
    expect(page3).not.toBeNull();
  });

});