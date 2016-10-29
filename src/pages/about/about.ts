import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'about.html'
})
export class About {

  constructor(private translate: TranslateService) {
  	this.translate = translate;
  }

}
