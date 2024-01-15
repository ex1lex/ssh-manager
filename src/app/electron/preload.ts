import { TConfig, TFile } from '@shared/types';
import { contextBridge } from 'electron';

import api from '../api';

declare global {
	interface Window {
		electron: {
			getListOfConfigs: () => Promise<TConfig[]>;
			getConfigByHost: (host: string) => Promise<TConfig>;
			deleteConfig: (host: string) => Promise<{
				list: TConfig[];
				txt: string;
			}>;
			createConfig: (newConfig: TConfig) => Promise<void>;
			createConfigFromString: (
				newConfig: string,
				file?: TFile
			) => Promise<void>;
			getTxtConfig: () => Promise<string>;
			editTxtConfig: (fileContent: string) => Promise<{
				list: TConfig[];
				txt: string;
			}>;
		};
	}
}

contextBridge.exposeInMainWorld('electron', api);
