import { Page2 } from './page2';
import { Geolocation } from 'ionic-native';

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
      spyOn(Geolocation, 'watchPosition').and.callFake(watchPositionStub);
      page2 = new Page2();
    });

    it('initialises with Geolocation', () => {
      expect(page2).not.toBeNull();
      expect(Geolocation.watchPosition).toHaveBeenCalled();
      expect(page2['latitude']).toBe(30.03);
      expect(page2['longitude']).toBe(51.22);
    });

  });
}