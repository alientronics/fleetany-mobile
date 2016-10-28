'use strict';

//import { Component } from '@angular/core';
import {Page, Events} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BluetoothProvider} from '../../providers/bluetooth';

@Page({
  templateUrl: 'bluetooth.html',
  pipes: [TranslatePipe]
})
export class Bluetooth {

  public blescan: boolean;
  public bledevice: string;
  public devices: Array<any>;
  public datastream: Array<any>;

  public position: number;
  public positions: Array<any>;

  constructor(
      public bluetoothProvider: BluetoothProvider, 
      public events: Events, 
      private translate: TranslateService) {

    this.translate = translate;
    this.events = events;

    this.position = 1;
    this.positions = [
      {k:1 , v:1}, {k:2 , v:2}, {k:3 , v:3}, {k:4 , v:4},
      {k:5 , v:5}, {k:6 , v:6}, {k:7 , v:7}, {k:8 , v:8},
      {k:9 , v:9}, {k:10 , v:10}, {k:11 , v:11}, {k:12 , v:12},
      {k:13 , v:13}, {k:14 , v:14}, {k:15 , v:15}, {k:16 , v:16},
    ];
    
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
