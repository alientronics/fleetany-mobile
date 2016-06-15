'use strict';

import {Injectable, Inject} from 'angular2/core';
import {Storage, Platform, LocalStorage, Events, NavController} from 'ionic-angular';
import {UserData} from './user-data';
import {GpsProvider} from './gps';
import {BLE, BluetoothSerial} from 'ionic-native';
import {Observable} from "rxjs/Observable";

var JSZip = require("jszip");

@Injectable()
export class BluetoothProvider {

  public storage: Storage;
  public watcher: any;
  private blescan: boolean;
  public bledevice: string;
  public devices: Array<any>;
  private deviceData: string;
  public datastream: Array<any>;
  private counter: number;
  private lastPosition: any;
  public userData: UserData;
  private gpsProvider: GpsProvider;
  private BLUETOOTH_DATA: string;
  private BLUETOOTH_CURRENT_DATA: string;
  
  constructor(
      @Inject(Events) public events: Events,
      @Inject(Platform) public platform: Platform,
      @Inject(Events) public nav: NavController,
      userData: UserData,
      gpsProvider: GpsProvider
  ) {
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.platform = platform;
    this.userData = userData;
    this.gpsProvider = gpsProvider;
    this.BLUETOOTH_DATA = 'bluetoothdata';
    this.BLUETOOTH_CURRENT_DATA = 'bluetoothcurrentdata';
    this.counter = 1;
    this.lastPosition = {"latitude": null, "longitude": null};
    this.setDisplayData();
    this.listenToUserDataEvents();
  }

  bleToggle(value) {
    if (this.userData.plate == null) {
      this.userData.showToast('Vehicle should be selected!', 'Error!', this.nav);
    } else {
      if (value) {
        this.datastream = [];
      }

      if (this.platform.is('mobile')) {
        this.bleToggleMobile(value);
      } else {
        this.bleToggleBrowser(value);
      }

      if (value) {
        var obj: any = new Object();
        obj.blescan = true;
        obj.bledevice = this.bledevice;
        obj.devices = this.devices;
        obj.datastream = this.datastream;
        let bluetoothCurrentData = JSON.stringify(obj);
        this.storage.set(this.BLUETOOTH_CURRENT_DATA, bluetoothCurrentData); 
        this.events.publish('ble:on');
      } else {
        var obj: any = new Object();
        obj.blescan = false;
        obj.bledevice = null;
        obj.devices = [];
        obj.datastream = [];
        let bluetoothCurrentData = JSON.stringify(obj);
        this.storage.set(this.BLUETOOTH_CURRENT_DATA, bluetoothCurrentData); 

        if(this.watcher != undefined) {
          this.watcher.unsubscribe();
          this.watcher = null;  
        }

        this.events.publish('ble:off');
      }
    }
  }

  bleToggleBrowser(value) {
    if (value) {
      this.bledevice = null;
      var devices = [
        {id: '73:08:19:71:8C:9B', name: 'Sensor 1'},
        {id: '73:08:19:71:8C:9C', name: 'Sensor 2'},
        {id: '73:08:19:71:8C:9D', name: 'Sensor 3'}
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
          if(this.datastream != undefined) {
            this.datastream.push('Disconnected');
          }
          console.log('Disconnected');
        });
      }
      BLE.startScan([]).subscribe(
        device => {
          console.log(device.json());
          if(this.datastream != undefined) {
            this.datastream.push("subscribe ok:" + JSON.stringify(device.json()));
          }
          if(this.datastream != undefined) {
            this.devices.push(device.json());
          }
        },
        err => {
          if(this.datastream != undefined) {
            this.datastream.push("subscribe err:" + JSON.stringify(err));
          }
          console.error(err);
        }
      );
      setTimeout(() => {
        BLE.stopScan().then(() => { 
          this.blescan = false;
          if(this.datastream != undefined) {
            this.datastream.push('scan stopped');
          }
          console.log('scan stopped'); 
        });
      }, 60000);
    } else {
      BLE.stopScan().then(() => { 
        if(this.datastream != undefined) {
            this.datastream.push('scan stopped');
          }
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
            this.datastream.push(JSON.stringify(data));
            this.setBluetoothData(data);
            this.datastream.push("write data:" + JSON.stringify(data) + this.counter);
            console.log("write data" + data);
          });
      });
    } else {
      var data = '{\"id\":\"0000000001\",\"pr\":127,\"tp\":22.0,\"ba\":2.95}\r\n';
      this.datastream.push(JSON.stringify(data));
      this.setBluetoothData(data);
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
              this.setBluetoothData(data);
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
      var data = '{\"id\":\"0000000001\",\"pr\":127,\"tp\":22.0,\"ba\":2.95}\r\n';
      this.datastream.push(JSON.stringify(data));
      this.setBluetoothData(data);
    }

    var obj: any = new Object();
    obj.blescan = false;
    obj.bledevice = value;
    obj.devices = this.devices;
    obj.datastream = this.datastream;
    let bluetoothCurrentData = JSON.stringify(obj);
    this.storage.set(this.BLUETOOTH_CURRENT_DATA, bluetoothCurrentData); 
    this.events.publish('ble:devicechanged');
  }

  setBluetoothData(data) {
    this.setPostData(data, this.BLUETOOTH_DATA, 'tiresensor');
  }

  getBluetoothData() {
    return this.storage.get(this.BLUETOOTH_DATA).then((value) => {
      return value;
    });
  }

  getBluetoothCurrentData() {
    return this.storage.get(this.BLUETOOTH_CURRENT_DATA).then((value) => {
      return value;
    });
  }

  setPostData(data, storage, urlApi) {

    var arrayData = [];

    if(data == null) {
      this.storage.set(storage, (JSON.stringify(arrayData)));
    } else {

        arrayData = JSON.parse(localStorage.getItem(storage));
        if (arrayData == null) {
          arrayData = [];
        }
        data = JSON.parse(data); 

        this.gpsProvider.getGpsCurrentData().then((dataGps) => {
          dataGps = JSON.parse(dataGps); 
          this.lastPosition.latitude = dataGps.latitude;
          this.lastPosition.longitude = dataGps.longitude; 
        });

        data.latitude = this.lastPosition.latitude;
        data.longitude = this.lastPosition.longitude;  

        arrayData.push(data);
        this.storage.set(storage, (JSON.stringify(arrayData).replace(/[\\]/g, '')));
    }
    
    if(data != null && this.userData.checkConnection()) {

      this.getPostData(storage).then((dataStorage) => {

        let postData: any = [];
        var zip = new JSZip(); 
        zip.file("postData.json", dataStorage);

        zip.generateAsync({
          type: "base64",
          compression: "DEFLATE",
          compressionOptions : {level:6}
        }).then((zipFile) => {

           if(dataStorage.length > 180) {
            postData.json = zipFile;
            postData.dataIsCompressed = 1;
           } else {
            postData.json = dataStorage;
            postData.dataIsCompressed = 0;
           }

           this.userData.postApi(urlApi, postData).subscribe(
            res => {
              this.setPostData(null, storage, urlApi);
            },
            error => {
              alert('Error sending data: ' + error.statusText);
              console.log(error);
            }
           );
        });

      });
    }
  }

  getPostData(storage) {
    return this.storage.get(storage).then((value) => {
      return value;
    });
  }

  setDisplayData() {
    this.getBluetoothCurrentData().then((data) => { 
      data = JSON.parse(data);
      this.blescan = data.blescan;
      this.bledevice = data.bledevice;
      this.devices = data.devices;
      this.datastream = data.datastream;
    });
  }

  listenToUserDataEvents() {
    this.events.subscribe('user:logout', () => {
      this.storage.remove(this.BLUETOOTH_DATA);
      this.storage.remove(this.BLUETOOTH_CURRENT_DATA);
    });
  }
}