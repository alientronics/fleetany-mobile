import { Alerts } from './alerts';

let alerts: Alerts = null;

describe('Alerts', () => {

beforeEach(() => {      
  alerts = new Alerts();
});

it('initialises', () => {
  expect(alerts).not.toBeNull();
});

});