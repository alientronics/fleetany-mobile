'use strict';

import { Component } from '@angular/core';
import { Alert, NavController} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {UserData} from '../../providers/user-data';
import {Toast} from 'ionic-native';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, AbstractControl } from '@angular/common';

@Component({
  templateUrl: 'fuel.html',
  pipes: [TranslatePipe],
  directives: [FORM_DIRECTIVES]
})
export class Fuel {

  public fuelForm: ControlGroup;
  public userData: UserData;
  private price: AbstractControl;
  private amount: AbstractControl;
  private type: AbstractControl;
  private miliage: AbstractControl;
  private tankfill: AbstractControl;
  private fuelsent: boolean;
  private vehiclefailed: boolean;
  private types: Array<any>;

  constructor(fb: FormBuilder, userData: UserData, public nav: NavController, private translate: TranslateService) {
    this.translate = translate;
    this.userData = userData;
  	this.fuelsent = false;
  	this.vehiclefailed = false;
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
    
    (<Control>this.fuelForm.controls['type']).updateValue('regular');
    (<Control>this.fuelForm.controls['tankfill']).updateValue(true);
  }

  onSubmit(value: any): void { 
      if(this.fuelForm.valid) {
          console.log('Submitted value: ', value);

          let params: any = {};
          params.fuel_cost = value.price;
          params.fuel_amount = value.amount;
          params.end_mileage = value.miliage;
          params.fuel_type = value.type;
          params.tank_fill_up = value.tankfill ? 1 : 0;			
           
          if (this.userData.plate == null) {
            this.userData.showToast('Vehicle should be selected!', 'Error!', this.nav);			    
          } else {
            this.userData.postApi('trip', params).subscribe(
              res => {

                for(let field in this.fuelForm.controls) {
                  (<Control>this.fuelForm.controls[field]).updateValue('');
                };

                (<Control>this.fuelForm.controls['type']).updateValue('regular');
                (<Control>this.fuelForm.controls['tankfill']).updateValue(true);

                this.userData.showToast('Fuel sent successfully!', 'Success!', this.nav);
            
              },
              error => {
                //this.userData.showToast('Error sending data: ' + error.statusText, 'Error!', this.nav);
                console.log(error);
              }
            );
          }
      }
  } 

}
