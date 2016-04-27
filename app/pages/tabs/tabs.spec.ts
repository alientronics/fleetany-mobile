import { TabsPage } from './tabs';
import { Platform, NavController, Alert } from 'ionic-angular';

let tabs: TabsPage = null;

describe('TabsPage', () => {

  beforeEach(() => {     
    let platform = new Platform();
    tabs = new TabsPage(platform, null);
  });

  it('initialises', () => {
    expect(tabs).not.toBeNull();
  });

    //expect(Geolocation.watchPosition).toHaveBeenCalled();
    //expect(page2['latitude']).toBe(30.03);
    //expect(page2['longitude']).toBe(51.22);

});