'use strict';

import {Page, Alert, NavController, Events, Platform} from 'ionic-angular';
import {forwardRef, Inject, Type} from 'angular2/core';
import {UserData} from '../../providers/user-data';
import {About} from '../about/about';

@Page({
  templateUrl: 'build/pages/alerts/alerts.html',
})

export class Alerts {

  private nav: NavController;
  private platform: Platform;
  private userData: UserData;
  private events: Events;
  private loggedIn: boolean;
  private gpstracking: boolean;
  private userImage: string;
  private welcome: string;
  private plate: string;
  private vehicles: Array<any>;

  constructor(nav: NavController, userData: UserData, events: Events, platform: Platform) {

  }

}
