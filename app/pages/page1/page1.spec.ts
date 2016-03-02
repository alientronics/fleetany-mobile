import { Page1 } from './page1';
import { Events, NavController }   from 'ionic-framework/ionic';
import { UserData } from '../../providers/user-data';

let page1: Page1 = null;

export function main(): void {
  'use strict';

  describe('Page1', () => {

    beforeEach(() => {
      let events: Events = new Events();
      let userData: UserData = new UserData(events);
      page1 = new Page1(null, userData, events);
    });

    it('initialises', () => {
      expect(page1).not.toBeNull();
    });
  });
}