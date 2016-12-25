import { UserData } from './user-data';
import { Events, Platform }  from 'ionic-angular';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { StorageMock, AlertControllerMock, LoadingControllerMock, WatcherMock, MockClass } from '../mocks';
import { Toast, Network, Globalization } from 'ionic-native';

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

  it('should push event at login', () => {
    spyOn(instance, 'load').and.returnValue(true);
    spyOn(instance.events, 'publish').and.callThrough();
    instance.login({email:"null"});
    expect(instance.events.publish).toHaveBeenCalledWith('user:login');
  });

  it('should push event at logout', () => {
    spyOn(instance.events, 'publish').and.callThrough();
    instance.logout();
    expect(instance.data).toBeNull();
    expect(instance.events.publish).toHaveBeenCalledWith('user:logout');
  });

  it('should set storage at load', () => {
    this.data = null;
    spyOn(instance.storage, 'set').and.callThrough();
    spyOn(instance, 'hasLoggedIn').and.returnValue(true);
    spyOn(instance, 'postApi').and.returnValue(new WatcherMock(new MockClass(),false));
    instance.load();
    expect(instance.storage.set).toHaveBeenCalled();
  });

  it('should call post at postApi', () => {
    spyOn(instance.http, 'post').and.returnValue(true);
    instance.postApi('',[]);
    expect(instance.http.post).toHaveBeenCalled();
  });

  it('should call Toast when cordova', () => {
    spyOn(instance.platform, 'is').and.returnValue(true);
    spyOn(Toast, 'show').and.returnValue(new WatcherMock('toast',false));
    instance.showToast('','',null);
    expect(Toast.show).toHaveBeenCalled();
  });

  it('should call Nav when not cordova', () => {
    spyOn(instance.platform, 'is').and.returnValue(false);
    let alertCtrl = new AlertControllerMock();
    spyOn(alertCtrl, 'create').and.returnValue(new MockClass());
    instance.showToast('','',alertCtrl);
    expect(alertCtrl.create).toHaveBeenCalled();
  });

});