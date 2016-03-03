import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { Platform, Events }   from 'ionic-framework/ionic';
import { FleetanyApp }           from './app';
import { UserData } from './providers/user-data';

// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

let fleetanyApp: FleetanyApp = null;

export function main(): void {
  'use strict';

  describe('FleetanyApp', () => {

    beforeEach(() => {
      let platform: Platform = new Platform();
      fleetanyApp = new FleetanyApp(platform);
    });

    it('initialises with a root page', () => {
      expect(fleetanyApp['rootPage']).not.toBe(null);
    });

    it('initialises with an app', () => {
      expect(fleetanyApp['app']).not.toBe(null);
    });

  });
}
