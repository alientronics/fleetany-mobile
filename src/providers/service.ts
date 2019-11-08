export class UartService {

  public buffer: ArrayBuffer;

  cheksum(bytes: Array<any>): number {
    var cheksum = 0;
    for (var i = 0; i < bytes.length; ++i) { cheksum += bytes[i]; }
    return cheksum % 256
  }

  constructor() {
  	this.buffer = new ArrayBuffer(0);
  }

  _resetIfHasStart(cbPrint: (dataView: DataView) => void) {
    var dataView = new DataView(this.buffer);

    for (let i = 1; i < dataView.byteLength; i++) { 
      if (dataView.getUint8(i) == 0xAA && dataView.byteLength > (i + 2)) {
        if (dataView.getUint8(i) == 0xAA && dataView.getUint8(i+1) == 0xA1 && dataView.getUint8(i+2) == 0x41) {
          var sliceView = new DataView(dataView.buffer, 0, i)
          cbPrint(sliceView);
          this.buffer = this.buffer.slice(i,this.buffer.byteLength);
          this._resetIfHasStart(cbPrint);
          break;
        }
      }
    }

  }

  _appendRawData(dataBuffer) {
    var dataView = new DataView(dataBuffer);

    if (dataView.getUint8(0) == 0xAA) {
      this.buffer = dataBuffer;
    } else {
      this.buffer = this._appendBuffer(this.buffer, dataBuffer);
    }
  }

  _appendBuffer (buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp.buffer;
  };

  _buffer2String(buffer) {
    var dataView = new DataView(buffer);
    return this._dataView2String(dataView);
  };

  _dataView2String(dataView: DataView) {
    var hexData = "";
    for (let i = 0; i < dataView.byteLength; i++) { 
        hexData += '' + dataView.getUint8(i).toString(16).toUpperCase();
    }
    return JSON.stringify(hexData);
  };

  byte2hex(bytes: Array<any>) {
    var arrayBuffer = new Uint8Array(bytes);
    return this._buffer2String(arrayBuffer.buffer);
  }

  processTireData(buffer: ArrayBuffer):any {

    var dataView = new DataView(buffer);

    if (dataView.getUint8(0) != 0xAA 
        || dataView.getUint8(1) != 0xA1 
        || dataView.getUint8(2) != 0x41 
        || ( dataView.getUint8(4) != 0x63 && dataView.getUint8(4) != 0x66 )
    ) {
      return "not tire data 66H or 63H";
    }

    var tire_id: string = ""
    var nTire: number = 0;
    var pres: number = 0;
    var temp: number = 0;
    var pad = "00"

    //get sensor id
    for (let i = 0; i < 3; i++) { 
        var part = dataView.getUint8(6 + i).toString(16).toUpperCase()
        tire_id += '' + pad.substring(0, pad.length - part.length) + part
    }
    //get tire position
    nTire = dataView.getUint8(5);

    //if sensor has no pressure or temperature
    if ( dataView.getUint8(12) == 0x40 || dataView.getUint8(11) == 0 ) {
      pres = -1;
      temp = -1;
    } else { //otherwise
      if (dataView.getUint8(9)>0) { pres = 256; }
      pres += dataView.getUint8(10);
      pres = pres * 14.5 * 0.025; //bar to psi
      pres = Math.round(pres * 100) / 100; //round(10.2)
      temp = dataView.getUint8(11) - 50;
    }

    return {
      pos: nTire,
      id: tire_id,
      pres: pres.toString(10),
      temp: temp.toString(10),
      count: 1
    }

  }

}