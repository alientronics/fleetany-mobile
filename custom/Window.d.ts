interface IGooglePlus {
    isAvailable(success: (avaiablity:boolean) => void): void; 
    login(options: any, success: (object:any) => void, error: (message:string) => void): void; 
    logout(success: (message:string) => void): void;
}

interface IBackgroundGeolocation {
    configure( success: (location:any) => void, error: (err:any) => void, options:any ): void; 
    start( success: (result:any) => void, error: (err:any) => void ): void; 
    stop( success: (result:any) => void, error: (err:any) => void ): void;
    finish(): void;
}

interface IGeofence {
	addOrUpdate(geofence: any): Promise<any>;
    initialize(): Promise<any>;
    removeAll(): Promise<any>;
    onTransitionReceived: any;
}

interface IPlugins {
    googleplus: IGooglePlus;
    backgroundGeoLocation: IBackgroundGeolocation;
}

interface Window {    
    plugins: IPlugins;
    geofence: IGeofence;
    cordova: boolean;
}