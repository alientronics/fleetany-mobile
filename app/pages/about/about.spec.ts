import { About } from './about';

let about: About = null;

export function main(): void {
  'use strict';

  describe('About', () => {

    beforeEach(() => {      
      about = new About();
    });

    it('initialises', () => {
      expect(about).not.toBeNull();
    });

  });
}