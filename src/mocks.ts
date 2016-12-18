
// IONIC:

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class AlertsProviderMock {
  public getAlertsData(): any {
    return new Promise((resolve: Function) => {
      resolve('[1, 5]');
    });
  }
}

export class BluetoothProviderMock {

  public getBluetoothCurrentData(): any {
    return new Promise((resolve: Function) => {
      resolve('[{\"blescan\":1,\"bledevice\":0,\"devices\":1,\"datastream\":0}]');
    });
  }

  public bleToggle(b:boolean): any {}

}