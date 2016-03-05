'use strict';

import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {

  private price: number;
  private amount: number;
  private type: string;
  private miliage: number;
  private tankfill: boolean;
  private fuelsent: boolean;

  constructor() {
  	this.tankfill = true;
  	this.fuelsent = false;
  }

  sendFuel() {
  	this.price = null;
  	this.amount = null;
  	this.type = '';
  	this.miliage = null;
  	this.tankfill = true;
  	this.fuelsent = true;
  }

  closeAlert() {
  	this.fuelsent = false;
  }

}
