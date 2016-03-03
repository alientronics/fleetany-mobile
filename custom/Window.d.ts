interface IGooglePlus {
    isAvailable(success: (avaiablity:boolean) => void): void; 
    login(options: any, success: (object:any) => void, error: (message:string) => void): void; 
    logout(success: (message:string) => void): void;
}

interface IPlugins {
    googleplus: IGooglePlus;
}

interface Window {    
    plugins: IPlugins;
}

declare var window: Window;