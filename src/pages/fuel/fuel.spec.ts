import { Fuel } from './fuel';
import { ComponentFixture, async }  from '@angular/core/testing';
import { TestUtils } from '../../test';
import { MockClass, WatcherMock } from '../../mocks';


let fixture: ComponentFixture<Fuel> = null;
let instance: any = null;

let value: any = {
  price: 12.34,
  amount: 12.34,
  miliage: 1234,
  type: 1,
  tankfill: 1,
  valid: true
};

describe('Fuel', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([Fuel]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    fixture.detectChanges();
    spyOn(instance.userData, 'showToast').and.returnValue(true);
    spyOn(instance.userData, 'postApi').and.returnValue(new WatcherMock('',false));
    spyOn(instance.fuelForm, 'valid').and.returnValue(true);
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('initialises', () => {
    expect(instance).not.toBeNull();
  });

  it('should submit form', () => {
    instance.userData.plate = 1;
    instance.onSubmit(value);
    expect(instance.userData.postApi).toHaveBeenCalled();
    expect(instance.userData.showToast).toHaveBeenCalled();
  });

  it('should ask for a vehicle', () => {
    instance.userData.plate = null;
    instance.onSubmit(value);
    expect(instance.userData.showToast).toHaveBeenCalled();
  });

});