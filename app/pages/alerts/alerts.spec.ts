import { Alerts } from './alerts';

let alerts: Alerts = null;

class MockClass {}

describe('Alerts', () => {

beforeEach(() => {      
  let mockClass: any = (<any>new MockClass());
  alerts = new Alerts(mockClass);
});

it('initialises', () => {
  expect(alerts).not.toBeNull();
});

});