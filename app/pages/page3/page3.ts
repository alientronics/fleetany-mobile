'use strict';

import {Page} from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from 'angular2/common';

@Page({
  templateUrl: 'build/pages/page3/page3.html',
  directives: [FORM_DIRECTIVES]
})
export class Page3 {

  private fuelForm: ControlGroup;
  private price: AbstractControl;
  private amount: AbstractControl;
  private type: AbstractControl;
  private miliage: AbstractControl;
  private tankfill: AbstractControl;
  private fuelsent: boolean;

  constructor(fb: FormBuilder) {
  	this.fuelsent = false;

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

    this.fuelForm.controls['type'].updateValue('regular');
    this.fuelForm.controls['tankfill'].updateValue(true);
  }

  onSubmit(value: string): void { 
      if(this.fuelForm.valid) {
          console.log('Submitted value: ', value);

          for(let field in this.fuelForm.controls) {
              this.fuelForm.controls[field].updateValue('');
          };

          this.fuelForm.controls['type'].updateValue('regular');
          this.fuelForm.controls['tankfill'].updateValue(true);

          this.fuelsent = true;
      }
  } 

  closeAlert() {
  	this.fuelsent = false;
  }

}
