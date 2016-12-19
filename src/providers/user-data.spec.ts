import { UserData } from './user-data';
import { Events, Platform }  from 'ionic-angular';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { StorageMock, AlertControllerMock, LoadingControllerMock } from '../mocks';

let instance: UserData = null;

describe('UserData', () => {

  beforeEach(() => {
    instance = new UserData(
    			<any>new Events(), 
          <any>new Http(new MockBackend(), new BaseRequestOptions()),
    			<any>new Platform(),
          <any>new StorageMock(),
    			<any>new LoadingControllerMock()
    		);
  });

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

});