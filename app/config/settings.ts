'use strict';

export class Settings {
	public base_url: string = 'http://localhost:8000/api/v1/';
	public api_token: string = 'api_token=h27sdals0129hfg726';
	public vehicles_url: string = 'data/vehicles.json';

	genUrl(url, user) {
		return 'http://localhost:8000/api/v1/user?api_token=OTscjZ19F&email=admin@alientronics.com.br';
		return this.base_url + url + '?' + this.api_token + '&' + 'user=' + user;
	}
}

