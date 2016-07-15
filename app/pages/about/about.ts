'use strict';

import { Component } from '@angular/core';
import {Page} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Page({
  templateUrl: 'build/pages/about/about.html',
  pipes: [TranslatePipe]
})
export class About {

  constructor(private translate: TranslateService) {
  	this.translate = translate;
  }

}
