import { TabsPage } from './tabs';
import { Platform, NavController, Alert } from 'ionic-angular';

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
    let platform = new Platform();
    let nav:any = new MockClass();
    spyOn(nav, 'present').and.callFake(createStub);
    tabs = new TabsPage(platform, nav);
  });

  it('initialises', () => {
    expect(tabs).not.toBeNull();
  });

  it('checkBack', () => {
     spyOn(Alert, 'create').and.callFake(createStub);
     tabs.checkBack();
     expect(Alert.create).toHaveBeenCalled();
     expect(tabs.nav.present).toHaveBeenCalled();
  });

});