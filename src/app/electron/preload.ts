import { contextBridge } from 'electron';

import api from '../api';

declare global {
	interface Window {
		electron: {
			getListOfConfigs: () => Promise<Record<string, any>[]>;
			getConfigByHost: (host: string) => Promise<Record<string, any>>;
			deleteConfig: (host: string) => Promise<void>;
			createConfig: (newConfig: Record<string, any>) => Promise<void>;
			createConfigFromString: (newConfig: string) => Promise<void>;
			getConfigFileTxt: (fileName: string) => Promise<string>;
		};
	}
}

contextBridge.exposeInMainWorld('electron', api);
