import { About } from './about';

let about: About = null;

class MockClass {}

describe('About', () => {

beforeEach(() => {      
  let mockClass: any = (<any>new MockClass());
  about = new About(mockClass);
});

it('initialises', () => {
  expect(about).not.toBeNull();
});

});