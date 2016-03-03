'use strict';

import {Page, Alert, NavController, Events} from 'ionic-framework/ionic';
import {forwardRef, Inject, Type} from 'angular2/core';
import {UserData} from '../../providers/user-data';
import {About} from '../about/about';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})

export class Page1 {

  private nav: NavController;
  private userData: UserData;
  private events: Events;
  private loggedIn: boolean;
  private userImage: string;
  private welcome: string;
  private plate: string;
  private vehicles: Array<any>;

  constructor(nav: NavController, userData: UserData, events: Events) {
    this.nav = nav;
    this.userData = userData;
    this.events = events;
    this.loggedIn = false;
    this.vehicles = []

    this.userData.hasLoggedIn().then((userObj) => {
      this.loggedIn = (userObj !== null);
      this.updateUser(JSON.parse(userObj));      
    });

    this.listenToLoginEvents();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
    });
  }

  googleLogin() {
    if (window.plugins) {
      window.plugins.googleplus.isAvailable((available) => {
        if (available) {
            window.plugins.googleplus.login(
                {},
                (obj) => {
                  this.userData.login(obj);
                  this.updateUser(obj);
                },
                (msg) => {
                  this.welcome = "error: " + msg;
                }
            );
        }
      });
    } else {
      let dummyUser = {
        imageUrl: "https://github.com/identicons/jasonlong.png",
        displayName: "dear User",
        email: "dummy@email.com"
      }
      this.userData.login(dummyUser);
      this.updateUser(dummyUser);
    }
  }

  googleLogout() {
    if (window.plugins) {
      window.plugins.googleplus.logout(
          (msg) => {
            this.userImage = ""
            this.welcome = msg;
            this.plate = '';
          }
      );
    }
    this.userData.logout();
  }

  updateUser(obj) {
    if (obj == null) return false;
    if (obj.imageUrl) { this.userImage = obj.imageUrl; }
    this.welcome = "Hi, " + obj.displayName + ", " + obj.email;
    this.userData.email = obj.email;
    this.userData.getVehicles().then((vehicles) => {
      this.vehicles = vehicles;
    });

    this.userData.getPlate().then((plate) => {
      this.plate = plate;
    });
  }

  onAbout() {
    this.nav.push(About);
  }

  plateChange(value) {
    this.userData.setPlate(value);
  }

}
