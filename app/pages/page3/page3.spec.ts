import { Page3 } from './page3';

let page3: Page3 = null;

export function main(): void {
  'use strict';

  describe('Page3', () => {

    beforeEach(() => {      
      page3 = new Page3();
    });

    it('initialises', () => {
      expect(page3).not.toBeNull();
    });

  });
}