import { useAppDispatch } from '@app/redux';
import {
	getConfigSelector,
	getConfigsSelector,
	getTxtConfigSelector,
	setConfig,
	setConfigs,
	setTxtConfig,
} from '@app/redux/slices/configs';
import { TConfig } from '@shared/types';
import { toast } from 'react-toastify';

export const useConfig = () => {
	const dispatch = useAppDispatch();
	const configs = getConfigsSelector();
	const config = getConfigSelector();
	const txtConfig = getTxtConfigSelector();

	const _setConfigs = (_newConfigs: TConfig[]) => {
		dispatch(setConfigs(_newConfigs));
	};

	const _setConfig = (_newConfig: TConfig) => {
		dispatch(setConfig(_newConfig));
	};

	const _setTxtConfig = (_newConfig: string) => {
		dispatch(setTxtConfig(_newConfig));
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
			.then((_configs) => {
				_setConfigs(_configs);
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

	const createConfig = (newConfig: string) => {
		return window.electron
			.createConfigFromString(newConfig)
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

	const getTxtConfig = () => {
		window.electron.getTxtConfig().then((_txtConfig) => {
			_setTxtConfig(_txtConfig);
		});
	};

	return {
		state: {
			configs,
			config,
			txtConfig,
		},
		getConfigs,
		getConfig,
		getTxtConfig,
		createConfig,
		deleteConfig,
		refreshConfigs,
	};
};
