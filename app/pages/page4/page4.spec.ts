import { Page4 } from './page4';
import { BLE } from 'ionic-native';
import { Events, Platform }   from 'ionic-angular';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'

let page4: Page4 = null;

class MockClass {
  public present(): any { return true; }
}

describe('Page4', () => {

  beforeEach(() => {   
    let mockClass: any = (<any>new MockClass());
    let platform: Platform = new Platform();
    let events: Events = new Events();
    let userData: any = {};
    userData.plate = 1;
    page4 = new Page4(userData, platform, events, mockClass);
  });

  it('initialises', () => {
    expect(page4).not.toBeNull();
  });

  
});