import { UserData } from './user-data';
import { Events } from 'ionic-framework/ionic';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'

let userData: UserData = null;

export function main(): void {
  'use strict';

  describe('UserData', () => {

    beforeEach(() => {
      let events: Events = new Events();
      let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
      userData = new UserData(events, http);
    });

    it('initialises', () => {
      expect(userData).not.toBeNull();
    });

  });
}