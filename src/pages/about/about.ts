import { Component } from '@angular/core';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'about.html',
  pipes: [TranslatePipe]
})
export class About {

  constructor(private translate: TranslateService) {
  	this.translate = translate;
  }

}
