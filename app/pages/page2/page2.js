import {Page} from 'ionic-framework/ionic';
import {Geolocation} from 'ionic-native';


@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {

  constructor() {
  	this.gpstracking = true;

	let watch = Geolocation.watchPosition();
	watch.subscribe((data) => {
		this.latitude = data.coords.latitude;
		this.longitude = data.coords.longitude;
	})

  }

}
