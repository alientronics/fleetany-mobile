'use strict';

import {Injectable, Inject} from '@angular/core';
import { UartService } from '../service';
import { UserData } from '../../../providers/user-data';
import { GpsProvider } from '../../../providers/gps';
import { Platform, Events} from 'ionic-angular';
import { BluetoothSerial} from 'ionic-native';
import { Storage } from '@ionic/storage';

@Injectable()
export class BluetoothProvider {

  private BLUETOOTH_CURRENT_DATA: string;

  public bledevice: string;
  public datastream: Array<any>;
  public watcher: any;
  public connWatcher: any;
  
  public uart: UartService;
  public lastPosition: any;
  public devices: Array<any>;
  public positions: number;
  private eco: any;
  private ecoSubs: any;
  
  constructor(
      @Inject(Events) public events: Events,
      @Inject(Platform) public platform: Platform,
      @Inject(UserData) public userData: UserData,
      @Inject(GpsProvider) public gpsProvider: GpsProvider,
      public storage: Storage
  ) {
    this.BLUETOOTH_CURRENT_DATA = 'bluetoothcurrentdata';

    this.lastPosition = {};
    this.lastPosition.latitude = "";
    this.lastPosition.longitude = ""; 

    this.uart = new UartService();

    this.setDisplayData();
  }

  listDevices() {
    BluetoothSerial.list().then(
      value => {
        if (value.length > 0) {
          this.devices = value;
          this.setData();
        } else {
          alert('No bluetooth device paired!');
        }
      },
      err => {
        //this.devices = [ {id: '00:00:00:00:00:00', name: 'TPMS'} ]; 
        alert("list err:" + JSON.stringify(err));
        this.setData();
      }
    );
  }

  bledeviceChanged(value, positions, ask) {

      if (this.bledevice == value && ask) {
        if (confirm("Deseja sair?")) {
          this.clearDevice();
        }
        return false;
      }

      this.positions = positions;
      this.datastream = [];
      for (let i = 0; i < this.positions; i++) { 
        this.datastream.push({
          pos: i+1,
          id: i+1,
          pres: 0,
          temp: 0,
          count: 0
        });
      }

      //this.datastream.push("connecting to:" + JSON.stringify(value));
      this.connWatcher = BluetoothSerial.connect(value).subscribe(valueRet => {
          //this.datastream.push("connected ok:" + JSON.stringify(valueRet));
          //alert("connected to: " + valueRet);

          this.bledevice = value;

          var thing = this;
          for (let i = 0; i < this.positions; i++) { 
            setTimeout(function(){ thing.askTiresData(i+1); }, i*500);
          }

          thing.subscribeRepeater();
          this.ecoSubs = setInterval( function(){ thing.subscribeRepeater(); }, 30000);

        },
        err => {
          if (!this.platform.is('mobile')) {
            var thing = this;
            for (let i = 0; i < this.positions; i++) { 
              setTimeout(function(){ thing.inflatePair1(i+1); }, i*500);
            }
            this.bledevice = value;
            this.setData();
          }
          //this.datastream.push("connect err:" + JSON.stringify(err));
          alert("Dispositivo foi desconectado: " + err);
          //this.clearDevice();
        }
      );
  }

  clearDevice() {
    if (this.watcher != null) {
      this.watcher.unsubscribe();
      this.watcher = null;
    }
    if (this.connWatcher != null) {
      this.connWatcher.unsubscribe();
      this.connWatcher = null;
    }
    if (this.eco != null) { clearInterval(this.eco); }
    if (this.ecoSubs != null) { clearInterval(this.ecoSubs); }
    this.bledevice = null;
    this.datastream = [];
    this.setData();
  }

  subscribeRepeater() {
    var thing = this;
    BluetoothSerial.isConnected().then(
      (result) => {
        this.watcher = BluetoothSerial.subscribeRawData().subscribe(
          (dataBuffer: ArrayBuffer) => {

            this.uart._appendRawData(dataBuffer);
            this.uart._resetIfHasStart(this._printDataView);

            var dataView = new DataView(this.uart.buffer);
            this._printDataView(dataView);

            //this.datastream.push("subscribe data: " + this.uart._buffer2String(this.uart.buffer));
            //alert("subscribe data: " + this.uart._buffer2String(this.uart.buffer));

          },
          (err) => {
            //this.datastream.push("subscribe err:" + JSON.stringify(err));
            alert("subscribe err:" + err);
          }
        );
      },
      (err) => {
        //this.datastream.push("subscribe err:" + JSON.stringify(err));
        var value = this.bledevice;
        alert("Tetando reconectar:" + err);
        thing.connWatcher = BluetoothSerial.connect(value).subscribe(
          valueRet => {
            alert("Dispositivo reconectado!");
            thing.subscribeRepeater();
          },err => {
            alert("Não foi possível reconectar.");
          }
        );
      }
    );
  }

  getAllAlerts() {
      var bytes = [];

      bytes.push(0xAA);
      bytes.push(0x41);
      bytes.push(0xA1);
      bytes.push(0x07);
      bytes.push(0x62);
      bytes.push(0x00); 
      bytes.push(this.uart.cheksum(bytes)); 

      var arrayBuffer = new Uint8Array(bytes);
      //this.datastream.push("write data: " + this.uart._buffer2String(arrayBuffer.buffer));
      var thing = this;

      BluetoothSerial.isConnected().then((result) => {
          BluetoothSerial.write(bytes).then((data) => {
            //this.datastream.push("write result data: " + data);
            //alert("Bluetooth Eco");
            thing.datastream[0].count++;
            thing.setData();
          });
      });
  }

  inflatePair1(position) {
      var bytes = [];

      var bytePosition = new Uint8Array(1);
      bytePosition[0] = position;

      bytes.push(0xAA);
      bytes.push(0xA1);
      bytes.push(0x41);
      bytes.push(0x0E);
      bytes.push(0x66);
      bytes.push(bytePosition[0]);
      bytes.push(0x07);
      bytes.push(0x65);
      bytes.push(0xFC);
      bytes.push(0x00);
      bytes.push(0x0B);
      bytes.push(0x49);
      bytes.push(0x0B);
      bytes.push(this.uart.cheksum(bytes)); 

      var arrayBuffer = new Uint8Array(bytes);
      //this.datastream.push("write data: " + this.uart._buffer2String(arrayBuffer.buffer));

      var dataView = new DataView(arrayBuffer.buffer);
      this._printDataView(dataView);

  }

  inflatePair(position) {
      var bytes = [];

      var bytePosition = new Uint8Array(1);
      bytePosition[0] = position;

      bytes.push(0xAA);
      bytes.push(0x41);
      bytes.push(0xA1);
      bytes.push(0x07);
      bytes.push(0x66);
      bytes.push(bytePosition[0]); 
      bytes.push(this.uart.cheksum(bytes)); 

      var arrayBuffer = new Uint8Array(bytes);
      //this.datastream.push("write data: " + this.uart._buffer2String(arrayBuffer.buffer));

      BluetoothSerial.isConnected().then((result) => {
          BluetoothSerial.write(bytes).then((data) => {
            //this.datastream.push("write result data: " + data);
          });
      });
  }

  askTiresData(position) {
      var bytes = [];

      var bytePosition = new Uint8Array(1);
      bytePosition[0] = position;

      bytes.push(0xAA);
      bytes.push(0x41);
      bytes.push(0xA1);
      bytes.push(0x07);
      bytes.push(0x63);
      bytes.push(bytePosition[0]); 
      bytes.push(this.uart.cheksum(bytes)); 

      var arrayBuffer = new Uint8Array(bytes);
      //this.datastream.push("write data: " + this.uart._buffer2String(arrayBuffer.buffer));

      BluetoothSerial.isConnected().then((result) => {
          BluetoothSerial.write(bytes).then(
            (data) => {
              //this.datastream.push("write result data: " + data);
              //alert("write ok:" + data);
            },
            (err) => {
              //this.datastream.push("subscribe err:" + JSON.stringify(err));
              //alert("write err:" + err);
            }
          );
      });
  }

  _printDataView(dataView: DataView) {
    //alert("tire data: " + this.uart._buffer2String(dataView.buffer));

    if (dataView.byteLength > 4 && dataView.getUint8(3) == dataView.byteLength) {
      var tire = this.uart.processTireData(dataView.buffer);
      tire.count += this.datastream[tire.pos-1].count;
      this.datastream[tire.pos-1] = tire;
      this.setData();

      if(this.userData.checkConnection()) {

        //build json
        var arrayData : Array<any> = []
        arrayData.push({});
        arrayData[0].latitude = "";
        arrayData[0].longitude = "";
        arrayData[0].id = tire.id;
        arrayData[0].pos = tire.pos;
        arrayData[0].pr = tire.pres;
        arrayData[0].tp = tire.temp;
        arrayData[0].ba = 0;

        this.gpsProvider.getGpsCurrentData().then((dataGps) => {
          dataGps = JSON.parse(dataGps); 
          this.lastPosition.latitude = dataGps.latitude;
          this.lastPosition.longitude = dataGps.longitude; 
        });

        arrayData[0].latitude = this.lastPosition.latitude;
        arrayData[0].longitude = this.lastPosition.longitude;

        //build data obj
        var postData : any = {};
        postData.json = JSON.stringify(arrayData);
        postData.dataIsCompressed = 0;

        //send data to server
        this.userData.postApi('tiresensor', postData).subscribe(
          res => {
            console.log("Data Sended: " + res);
          },
          error => {
            //alert('Error sending data: ' + error.statusText);
            console.log(error);
          }
        );

      }
    }
  }

  setData() {
    var obj: any = new Object();
    obj.bledevice = this.bledevice;
    obj.datastream = this.datastream;
    obj.devices = this.devices;
    obj.positions = this.positions;

    let bluetoothCurrentData = JSON.stringify(obj);
    this.storage.set(this.BLUETOOTH_CURRENT_DATA, bluetoothCurrentData); 
    this.events.publish('ble:update');
  }
 
  getBluetoothCurrentData() {
    return this.storage.get(this.BLUETOOTH_CURRENT_DATA).then((value) => {
      return value;
    });
  }

  setDisplayData() {
    this.getBluetoothCurrentData().then(
      (data) => { 
        data = JSON.parse(data);
        this.devices = data.devices;
        this.bledevice = data.bledevice;
        this.positions = data.positions;

        if (this.userData.plate != null && this.bledevice != null) {
          this.bledeviceChanged(this.bledevice, this.positions, false);
        }

      }
    );
  }

}