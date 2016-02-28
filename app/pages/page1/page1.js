import {Page, Alert, NavController, Events} from 'ionic-framework/ionic';
import {forwardRef, Inject} from 'angular2/core';
import {UserData} from '../../providers/user-data';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  static get parameters() {
    return [[NavController],[UserData],[Events]];
  }

  constructor(nav, userData, events) {
    this.nav = nav;
    this.userData = userData;
    this.events = events;
    this.loggedIn = false;

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.loggedIn = (hasLoggedIn == 'true');
    });

    this.listenToLoginEvents();
  }

  doAlert(title, message) {
    let alert = Alert.create({
      title: title,
      body: message,
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }

  googleLogin() {
    if (window.plugins) {
      window.plugins.googleplus.isAvailable((available) => {
        if (available) {
            window.plugins.googleplus.login(
                {},
                (obj) => {
                  if (obj.imageUrl) { this.userImage = obj.imageUrl; }
                  this.welcome = "Hi, " + obj.displayName + ", " + obj.email;
                  this.debug = JSON.stringify(obj);
                  this.userData.login(obj.email);
                },
                (msg) => {
                  this.welcome = "error: " + msg;
                }
            );
        }
      });
    } else {
      this.userImage = "https://github.com/identicons/jasonlong.png";
      this.welcome = "Hi, Dear User, plugins aren't available now.";
      this.debug = JSON.stringify({email:'dummy@email',oauthToken:'some-token'});
      this.userData.login('dummy@email');
    }
  }

  googleLogout() {
    if (window.plugins) {
      window.plugins.googleplus.logout(
          function (msg) {
            this.userImage = ""
            this.welcome = msg;
          }
      );
    }
    this.userData.logout();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:signup', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
    });
  }

}
