'use strict';

import { Component } from '@angular/core';
import { AlertController, NavController} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { UserData } from '../../providers/user-data';
import { Toast } from 'ionic-native';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  templateUrl: 'fuel.html'
})
export class Fuel {

  public fuelForm: any;
  public userData: UserData;
  public price: AbstractControl;
  public amount: AbstractControl;
  public type: AbstractControl;
  public miliage: AbstractControl;
  public tankfill: AbstractControl;
  public fuelsent: boolean;
  public vehiclefailed: boolean;
  public types: Array<any>;

  constructor(
      fb: FormBuilder, 
      userData: UserData, 
      public nav: NavController, 
      private translate: TranslateService,
      public alertCtrl: AlertController 
  ) {
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
    
    this.fuelForm.controls['type'].updateValue('regular');
    this.fuelForm.controls['tankfill'].updateValue(true);
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
            this.userData.showToast('Vehicle should be selected!', 'Error!', this.alertCtrl);			    
          } else {
            this.userData.postApi('trip', params).subscribe(
              res => {

                for(let field in this.fuelForm.controls) {
                  this.fuelForm.controls[field].updateValue('');
                };

                this.fuelForm.controls['type'].updateValue('regular');
                this.fuelForm.controls['tankfill'].updateValue(true);

                this.userData.showToast('Fuel sent successfully!', 'Success!', this.alertCtrl);
            
              },
              error => {
                //this.userData.showToast('Error sending data: ' + error.statusText, 'Error!', this.nav);
                console.log(error);
              }
            );
          }
      }
  } 

  closeAlert() {
    //void
  }

}
