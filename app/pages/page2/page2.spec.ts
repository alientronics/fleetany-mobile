import { Page2 } from './page2';
import { Geolocation } from 'ionic-native';
import { IonicApp, Platform } from 'ionic-angular';

let page2: Page2 = null;

function watchPositionStub(options: any): any {
  'use strict';

  let watcher: Object = {
    subscribe: function(callback : any): void {
      let data = { 
        coords: { 
          latitude: 30.03,
          longitude: 51.22,
        }
      }
      return callback(data); 
    }
  };
  return watcher;
}

export function main(): void {
  'use strict';

  describe('Page2', () => {

    beforeEach(() => {   
      let app = new IonicApp(null, null, null);
      let platform: Platform = new Platform();
      spyOn(Geolocation, 'watchPosition').and.callFake(watchPositionStub); 
      spyOn(app, 'getComponent').and.returnValue({ tabBadge: 0});
      page2 = new Page2(app, platform);
    });

    it('initialises', () => {
      expect(page2).not.toBeNull();
    });

    it('should start gps tracking', () => {
      page2.gpsToggle(true);
      expect(Geolocation.watchPosition).toHaveBeenCalled();
    });

    it('should subscribe gps location', () => {
      page2.gpsToggle(true);
      expect(page2['latitude']).toBe(30.03);
      expect(page2['longitude']).toBe(51.22);
    });

    it('should increment tab badge', () => {
      page2.gpsToggle(true);
      expect(page2['app'].getComponent).toHaveBeenCalledWith('tab2');
    });

  });
}