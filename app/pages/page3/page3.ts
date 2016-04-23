'use strict';

import {Page} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from 'angular2/common';

@Page({
  templateUrl: 'build/pages/page3/page3.html',
  directives: [FORM_DIRECTIVES]
})
export class Page3 {

  private fuelForm: ControlGroup;
  private userData: UserData;
  private price: AbstractControl;
  private amount: AbstractControl;
  private type: AbstractControl;
  private miliage: AbstractControl;
  private tankfill: AbstractControl;
  private fuelsent: boolean;
  private types: Array<any>;

  constructor(fb: FormBuilder, userData: UserData) {
    this.userData = userData;
  	this.fuelsent = false;
    this.types = []

    this.fuelForm = fb.group({  
        'price':    ['', Validators.required ],
        'amount':   ['', Validators.required ],
        'miliage':  ['', Validators.required ],
        'type':     ['', ],
        'tankfill': ['', ]
    });

    for(let field in this.fuelForm.controls) {
        this[field] = this.fuelForm.controls[field];
    };

	this.userData.getFuelTypes().then((types) => {
      this.types = types;
    });
    
    this.fuelForm.controls['type'].updateValue('regular');
    this.fuelForm.controls['tankfill'].updateValue(true);
  }

  onSubmit(value: string): void { 
      if(this.fuelForm.valid) {
          console.log('Submitted value: ', value);

          let params = [];
          params.fuel_cost = value.price;
          params.fuel_amount = value.amount;
          params.end_mileage = value.miliage;
          params.fuel_type = 1;
          params.tank_fill_up = value.tankfill ? 1 : 0;			
            
          this.userData.postApi('trip', params).subscribe(res => {

            for(let field in this.fuelForm.controls) {
                this.fuelForm.controls[field].updateValue('');
            };

            this.fuelForm.controls['type'].updateValue('regular');
            this.fuelForm.controls['tankfill'].updateValue(true);

            this.fuelsent = true;
            
          });
      }
  } 

  closeAlert() {
  	this.fuelsent = false;
  }

}
