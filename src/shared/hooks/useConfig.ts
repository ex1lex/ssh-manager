import { TConfig } from '@shared/types';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useConfig = () => {
	const [configs, setConfigs] = useState<TConfig[]>([]);
	const [config, setConfig] = useState<TConfig | undefined>();
	const [txtConfig, setTxtConfig] = useState<string | undefined>();

	const getConfigs = async () => {
		const _configs: any = await window.electron.getListOfConfigs();
		setConfigs(_configs);
	};

	const getConfig = async (val: string) => {
		const _config = await window.electron.getConfigByHost(val);
		setConfig(_config);
	};

	const onDelete = async (val: string) => {
		const _configs: any = await window.electron.deleteConfig(val);
		setConfigs(_configs);
	};

	const onRefresh = async () => {
		await getConfigs();
	};

	const createConfig = async (newConfig: string) => {
		await window.electron
			.createConfigFromString(newConfig)
			.catch((e) => toast.error(e.message));
		getConfigs();
	};

	const getTxtConfig = async () => {
		const draftConfig = await window.electron.getConfigFileTxt('config');
		setTxtConfig(draftConfig);
	};

	return {
		state: {
			configs,
			config,
			txtConfig,
		},
		getConfigs,
		onDelete,
		onRefresh,
		getConfig,
		createConfig,
		getTxtConfig,
	};
};
