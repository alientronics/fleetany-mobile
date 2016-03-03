import { TabsPage } from './tabs';

let tabs: TabsPage = null;

export function main(): void {
  'use strict';

  describe('TabsPage', () => {

    beforeEach(() => {      
      tabs = new TabsPage();
    });

    it('initialises', () => {
      expect(tabs).not.toBeNull();
    });

  });
}