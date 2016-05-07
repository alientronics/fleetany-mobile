'use strict';

import {Page, Platform, Events, NavController} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {BLE, BluetoothSerial} from 'ionic-native';
import {Observable} from "rxjs/Observable";

@Page({
  templateUrl: 'build/pages/page4/page4.html'
})
export class Page4 {

  private events: Events;
  private blescan: boolean;
  private userData: UserData;
  private platform: Platform;
  private bledevice: string;
  private devices: Array<any>;
  private deviceData: string;
  private datastream: Array<any>;
  private watcher: any;
  private counter: number;

  constructor(userData: UserData, platform: Platform, events: Events, public nav: NavController) {
    this.userData = userData;
    this.events = events;
    this.platform = platform;
    this.counter = 1;
  }

  bleToggle(value) {
    if (this.userData.plate == null) {
      this.userData.showToast('Vehicle should be selected!', 'Error!', this.nav);
    } else {
    	if (value) {
        this.datastream = [];
        this.events.publish('ble:on');
	    } else {
        this.events.publish('ble:off');
      }

	    if (this.platform.is('mobile')) {
	      this.bleToggleMobile(value);
	    } else {
	      this.bleToggleBrowser(value);
	    }
    }
  }

  bleToggleBrowser(value) {
    if (value) {
      this.bledevice = null;
      var devices = [
        {id: '73:08:19:71:8C:9B', name: 'Sensor 1'},
        {id: '73:08:19:71:8C:9C', name: 'Sensor 2'},
        {id: '73:08:19:71:8C:9D', name: 'Sensor 2'}
      ]; 
      //devices = [];
      if (devices.length > 0) {
        this.devices = devices;
      } else {
        this.userData.showToast('No bluetooth device paired!', 'Error!', this.nav);
      }   
    } else {
      this.devices = [];
    }
  }

  bleToggleMobile(value) {
    if (value) {
      BluetoothSerial.list().then(
        value => {
          if (value.length > 0) {
            this.devices = value;
          } else {
            this.userData.showToast('No bluetooth device paired!', 'Error!', this.nav);
          }
          //this.datastream.push("list ok:" + JSON.stringify(value));
          console.log(value);
        },
        err => {
          this.datastream.push("list err:" + JSON.stringify(err));
          console.error(err);
        }
      );
    } else {
      if (this.watcher) {
        this.watcher.unsubscribe();
        this.watcher = null;
      }
    }
  }

  bleToggleMobileBLE(value) {
    if (value) {
      if (this.bledevice) {
        BLE.disconnect(this.bledevice).then(() => {
          this.datastream.push('Disconnected');
          console.log('Disconnected');
        });
      }
      BLE.startScan([]).subscribe(
        device => {
          console.log(device.json());
          this.datastream.push("subscribe ok:" + JSON.stringify(device.json()));
          this.devices.push(device.json());
        },
        err => {
          this.datastream.push("subscribe err:" + JSON.stringify(err));
          console.error(err);
        }
      );
      setTimeout(() => {
        BLE.stopScan().then(() => { 
          this.blescan = false;
          this.datastream.push('scan stopped');
          console.log('scan stopped'); 
        });
      }, 60000);
    } else {
      BLE.stopScan().then(() => { 
        this.datastream.push('scan stopped');
        console.log('scan stopped'); 
      });
    }
  }
  
  sendData() {
    if (this.counter > 9) this.counter = 1;
    if (this.platform.is('mobile')) {
      BluetoothSerial.isConnected().then((result) => {
          var counter = (this.counter++).toString() + '\n';
          BluetoothSerial.write(counter).then((data) => {
            this.datastream.push("write data:" + JSON.stringify(data) + this.counter);
            console.log("write data" + data);
          });
      });
    } else {
      this.datastream.push("write data:" + this.counter++);
    }
  }

  bledeviceChanged(value) {
    this.blescan = false;
    this.datastream = [];
    if (this.platform.is('mobile')) {
      BluetoothSerial.connect(value).then(
        value => {
          this.datastream.push("connect ok:" + JSON.stringify(value));
          console.log(value);
          this.watcher = BluetoothSerial.subscribe('\n').subscribe(
            (data) => {
              this.datastream.push("subscribe data:" + JSON.stringify(data));
              this.userData.setBluetoothData(JSON.stringify(data));
              console.log("subscribe data" + data);
            },
            (err) => {
              this.datastream.push("subscribe err:" + JSON.stringify(data));
              console.log("subscribeRaw err:" + data);
            }
          );
        },
        err => {
          this.datastream.push("connect err:" + JSON.stringify(err));
          console.error(err);
        }
      );
    } else {
      var data =  [
        { id: 123456, ts: "2016-01-02 10:13:14", temp: 35.40, press: 105.27 },
        { id: 123457, ts: "2016-03-04 11:13:14", temp: 80.26, press: 40.46 },
        { id: 123458, ts: "2016-05-06 12:13:14", temp: 90.27, press: 50.47 }
       ];
      this.datastream.push(JSON.stringify(data));
      this.userData.setBluetoothData(JSON.stringify(data));
    }
  }

}
