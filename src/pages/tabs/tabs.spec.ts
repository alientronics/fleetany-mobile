import { TabsPage } from './tabs';
import { Platform, AlertController, NavParams } from 'ionic-angular';

let tabs: TabsPage = null;

class MockClass {
  public create(): any { return true; }
  public present(): any { return true; }
}

function createStub(options: any): any {
  'use strict';
  return new MockClass();
}

describe('TabsPage', () => {

  beforeEach(() => {     
    let mockClass: any = (<any>new MockClass());
    let platform = new Platform();
    let nav:any = new MockClass();
    let alertCtrl:any = new MockClass();
    let navParams:any = new NavParams();
    spyOn(alertCtrl, 'create').and.callFake(createStub);
    tabs = new TabsPage(platform, nav, navParams, mockClass, alertCtrl);
  });

  it('initialises', () => {
    expect(tabs).not.toBeNull();
  });

  it('checkBack', () => {
     tabs.checkBack();
     expect(tabs.alertCtrl.create).toHaveBeenCalled();
  });

});