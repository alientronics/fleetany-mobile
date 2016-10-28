import { TabsPage } from './tabs';
import { Platform, Alert, NavParams } from 'ionic-angular';

let tabs: TabsPage = null;

class MockClass {
  public present(): any { return true; }
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
    let navParams:any = new NavParams();
    spyOn(nav, 'present').and.callFake(createStub);
    tabs = new TabsPage(platform, nav, navParams, mockClass);
  });

  it('initialises', () => {
    expect(tabs).not.toBeNull();
  });

  it('checkBack', () => {
     spyOn(Alert, 'create').and.callFake(createStub);
     tabs.checkBack();
     //expect(Alert.create).toHaveBeenCalled();
     //expect(tabs.nav.present).toHaveBeenCalled();
  });

});