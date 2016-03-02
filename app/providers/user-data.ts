'use strict';

import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-framework/ionic';


@Injectable()
export class UserData {

  private storage: Storage;
  private HAS_LOGGED_IN: string;

  constructor(@Inject(Events) private events: Events) {
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.HAS_LOGGED_IN = 'hasLoggedIn';
  }

  login(email) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.events.publish('user:logout');
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
}