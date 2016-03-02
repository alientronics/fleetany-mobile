interface IGooglePlus {
    isAvailable(success: any): void; 
    login(options: any, success: any, error: any): void; 
    logout(success: any): void;
}

interface IPlugins {
    googleplus: IGooglePlus;
}

interface Window {    
    plugins: IPlugins;
}

declare var window: Window;