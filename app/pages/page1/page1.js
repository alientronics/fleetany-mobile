import {Page, Alert, NavController} from 'ionic-framework/ionic';
import {forwardRef} from 'angular2/core';
import {CordovaOauth, Google} from 'ng2-cordova-oauth/core';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.cordovaOauth = new CordovaOauth(new Google({clientId: "clientId.apps.googleusercontent.com", appScope: ["email"], "redirectUri": "http://localhost/callback"}));
    this.message = "";
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
	this.cordovaOauth.login().then((success) => {
	    this.doAlert('Login Success', JSON.stringify(success));
	}, (error) => {
	    this.doAlert('Login Error', error);
	});
  }

}
