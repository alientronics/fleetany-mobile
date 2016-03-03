'use strict';

export class Settings {
	public base_url: string = './';
	public api_token: string = 'api_token=h27sdals0129hfg726';
	public vehicles_url: string = 'data/vehicles.json';

	genUrl(url, user) {
		return this.base_url + url + '?' + this.api_token + '&' + 'user=' + user;
	}
}