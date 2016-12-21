export class AlertsProviderMock {
  
  public getAlertsData(): any {
    return new Promise((resolve: Function) => {
      resolve('[1, 5]');
    });
  }

  public setAlertsData(a:any): any {};

}

export class BluetoothProviderMock {

  public getBluetoothCurrentData(): any {
    return new Promise((resolve: Function) => {
      resolve('[{\"blescan\":1,\"bledevice\":0,\"devices\":1,\"datastream\":0}]');
    });
  }

  public bleToggle(b:boolean): any {};

}

export class UserDataMock {

  public getFuelTypes(): any {
    return new Promise((resolve: Function) => {
      resolve('');
    });
  }

  public hasLoggedIn(): any {
    return new Promise((resolve: Function) => {
      resolve('[{}]');
    });
  }

  public getPlate(): any {
    return new Promise((resolve: Function) => {
      resolve('');
    });
  }

  public getVehicles(): any {
    return new Promise((resolve: Function) => {
      resolve('');
    });
  }

  public showToast(s1:string, s2:string, a:any): any {}
  public setPlate(b:any): any {}

}

export class GpsProviderMock {

  public getGpsCurrentData(): any {
    return new Promise((resolve: Function) => {
      resolve('[{\"latitude\":1,\"longitude\":0,\"gpstracking\":1,\"count\":0}]');
    });
  }

}

export class StorageMock {

  public get(key: string): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve({key: key});
    });
  }

  public set(key: string, value: string): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve({key: key, value: value});
    });
  }

  public remove(key: string): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve({key: key});
    });
  }
}

export class GeofenceProviderMock {

  public getGeofenceData(): any {
    return new Promise((resolve: Function) => {
      resolve('[1, 5]');
    });
  }

}

export class AlertControllerMock {
  create(): any {
    return {};
  }
}

export class LoadingControllerMock {
  create(opts?: any) {
    return {
      present: () => {
      },
      dismiss: () => {
      }
    };
  };
}

export class NavMock {

  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export class TranslateServiceMock {

  public setDefaultLang(a:any): any {}
  public use(a:any): any {}

}