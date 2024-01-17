import { useAppDispatch } from '@app/redux';
import {
	getConfigSelector,
	getConfigsSelector,
	getTxtConfigsSelector,
	setConfig,
	setConfigs,
	setTxtConfigs,
} from '@app/redux/slices/configs';
import { TConfig, TFile } from '@shared/types';
import { toast } from 'react-toastify';

export const useConfig = () => {
	const dispatch = useAppDispatch();
	const configs = getConfigsSelector();
	const config = getConfigSelector();
	const txtConfigs = getTxtConfigsSelector();

	const _setConfigs = (_newConfigs: TConfig[]) => {
		dispatch(setConfigs(_newConfigs));
	};

	const _setConfig = (_newConfig: TConfig) => {
		dispatch(setConfig(_newConfig));
	};

	const _setTxtConfigs = (_newConfig: string) => {
		dispatch(setTxtConfigs(_newConfig));
	};

	const getConfigs = () => {
		window.electron
			.getListOfConfigs()
			.then((_configs) => _setConfigs(_configs));
	};

	const getConfig = (host: string) => {
		const findedConfig = configs.find(
			(_config) => _config?.Host === host || _config?.HostName === host
		);
		_setConfig(findedConfig);
	};

	const deleteConfig = (host: string) => {
		window.electron
			.deleteConfig(host)
			.then(({ list, txt }) => {
				_setConfigs(list);
				_setTxtConfigs(txt);
				if (config) {
					const isEqual = host === config?.Host || host === config?.HostName;
					if (isEqual) {
						_setConfig(undefined);
					}
				}
			})
			.then(() => toast('Config deleted'));
	};

	const refreshConfigs = () => getConfigs();

	const createConfig = (newConfig: string, file?: TFile) => {
		return window.electron
			.createConfigFromString(newConfig, file)
			.then(() => {
				getConfigs();
			})
			.then(() => {
				toast('Config created');
			})
			.catch((e) => {
				toast.error(e.message);
			});
	};

	const getTxtConfigs = () => {
		window.electron.getTxtConfig().then((_txtConfigs) => {
			_setTxtConfigs(_txtConfigs);
		});
	};

	const editTxtConfigs = (fileContent: string) => {
		return window.electron
			.editTxtConfig(fileContent)
			.then(({ txt, list }) => {
				_setTxtConfigs(txt);
				_setConfigs(list);
			})
			.then(() => toast('Config has been changed'));
	};

	return {
		state: {
			configs,
			config,
			txtConfigs,
		},
		getConfigs,
		getConfig,
		getTxtConfigs,
		editTxtConfigs,
		createConfig,
		deleteConfig,
		refreshConfigs,
	};
};
