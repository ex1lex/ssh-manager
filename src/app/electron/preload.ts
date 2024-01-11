import { TConfig } from '@shared/types';
import { contextBridge } from 'electron';

import api from '../api';

declare global {
	interface Window {
		electron: {
			getListOfConfigs: () => Promise<TConfig[]>;
			getConfigByHost: (host: string) => Promise<TConfig>;
			deleteConfig: (host: string) => Promise<TConfig[]>;
			createConfig: (newConfig: TConfig) => Promise<void>;
			createConfigFromString: (newConfig: string) => Promise<void>;
			getTxtConfig: () => Promise<string>;
		};
	}
}

contextBridge.exposeInMainWorld('electron', api);
