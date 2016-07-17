'use strict';

import { Component } from '@angular/core';
import {Page, Events} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BluetoothProvider} from '../../providers/bluetooth';

@Page({
  templateUrl: 'build/pages/bluetooth/bluetooth.html',
  pipes: [TranslatePipe]
})
export class Bluetooth {

  public events: Events;
  private blescan: boolean;
  public bledevice: string;
  public devices: Array<any>;
  public datastream: Array<any>;
  private bluetoothProvider: BluetoothProvider;

  constructor(bluetoothProvider: BluetoothProvider, events: Events, private translate: TranslateService) {
    this.translate = translate;
    this.bluetoothProvider = bluetoothProvider;
    this.events = events;

    this.setDisplayData();
    this.listenToBluetoothEvents();
    this.bluetoothProvider.bleToggle(true);
  }

  sendData() {
    this.bluetoothProvider.sendData();
  }

  bledeviceChanged(value) {
    this.bluetoothProvider.bledeviceChanged(value);
  }

  setDisplayData() {
    this.bluetoothProvider.getBluetoothCurrentData().then((data) => { 
      data = JSON.parse(data);
      this.blescan = data.blescan;
      this.bledevice = data.bledevice;
      this.devices = data.devices;
      this.datastream = data.datastream;
    });
  }

  listenToBluetoothEvents() {
    this.events.subscribe('ble:on', () => {
      this.setDisplayData();
    });

    this.events.subscribe('ble:off', () => {
      this.blescan = false;
    });

    this.events.subscribe('ble:devicechanged', () => {
      this.setDisplayData();
    });
  }
}
