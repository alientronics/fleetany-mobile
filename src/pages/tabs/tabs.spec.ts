import { TabsPage } from './tabs';
import { Platform, AlertController, NavParams } from 'ionic-angular';

let tabs: TabsPage = null;

class MockClass {
  public create(): any { return true; }
}

function createStub(options: any): any {
  'use strict';
  return true;
}

describe('TabsPage', () => {

  beforeEach(() => {     
    let mockClass: any = (<any>new MockClass());
    let platform = new Platform();
    let nav:any = new MockClass();
    let alert:any = new MockClass();
    let navParams:any = new NavParams();
    spyOn(alert, 'create').and.callFake(createStub);
    tabs = new TabsPage(platform, nav, navParams, mockClass, alert);
  });

  it('initialises', () => {
    expect(tabs).not.toBeNull();
  });

  it('checkBack', () => {
     spyOn(alert, 'create').and.callFake(createStub);
     tabs.checkBack();
     //expect(alert.create).toHaveBeenCalled();
  });

});