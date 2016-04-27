import { About } from './about';

let about: About = null;

describe('About', () => {

beforeEach(() => {      
  about = new About();
});

it('initialises', () => {
  expect(about).not.toBeNull();
});

});