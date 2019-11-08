'use strict';

import { Component, NgZone } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { BluetoothSerial } from 'ionic-native';
import { BluetoothProvider } from './providers/bluetooth';
import { UserData } from '../../providers/user-data';

@Component({
  templateUrl: 'bluetooth.html'
})
export class BluetoothUart {

  public bledevice: string;
  public devices: Array<any>;
  public datastream: Array<any>;
  public selected: boolean;
  
  public position: number;
  public positions: Array<any>;

  constructor(
    private translate: TranslateService, 
    public bluetoothProvider: BluetoothProvider,
    public events: Events,
    private nav: NavController,
    private userData: UserData,
    private _zone: NgZone
  ) {
    this.translate = translate;

    this.datastream = [];
    this.position = 1;
    this.positions = [
      //tractor tire positions
      {k:1 , v:1}, {k:2 , v:2}, {k:3 , v:3}, {k:4 , v:4},
      {k:5 , v:5}, {k:6 , v:6}, {k:7 , v:7}, {k:8 , v:8},
      {k:9 , v:9}, {k:10 , v:10}, {k:11 , v:11}, {k:12 , v:12},
      {k:13 , v:13}, {k:14 , v:14}
    ];

    this.devices = []; 
    this.bledevice = null;
    this.selected = false;

    this.bluetoothProvider.listDevices();
    this.setDisplayData();
    this.listenToBluetoothEvents();
  }

  bledeviceChanged(value) {
    this.bluetoothProvider.bledeviceChanged(value, this.positions.length, true);
  }

  inflatePair(position) {
    this.bluetoothProvider.inflatePair(position);
  }

  inflatePair1(position) { //debug at browser
    this.bluetoothProvider.inflatePair1(position);
  }

  askTiresData(position) {
    this.bluetoothProvider.askTiresData(position);
  }

  setDisplayData() {
    this.bluetoothProvider.getBluetoothCurrentData().then(
      (data) => { 
        this._zone.run(() => {
          data = JSON.parse(data);
          this.devices = data.devices;
          this.bledevice = data.bledevice;
          this.selected = (this.bledevice != null);
          this.datastream = data.datastream;
          //this.userData.loading(this.nav, "Bluetooth");
        });
      });
  }

  listenToBluetoothEvents() {
    this.events.subscribe('ble:update', () => {
      this.setDisplayData();
    });
  }

}
