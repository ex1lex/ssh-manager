import { useAppDispatch } from '@app/redux';
import {
	getConfigSelector,
	getConfigsSelector,
	getTxtConfigSelector,
	getTxtConfigsSelector,
	setConfig,
	setConfigs,
	setTxtConfig,
	setTxtConfigs,
} from '@app/redux/slices/configs';
import { TConfig, TFile } from '@shared/types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useConfig = () => {
	const { configId } = useParams();
	const dispatch = useAppDispatch();
	const configs = getConfigsSelector();
	const config = getConfigSelector();
	const txtConfigs = getTxtConfigsSelector();
	const txtConfig = getTxtConfigSelector();

	const _setConfigs = (_newConfigs: TConfig[]) => {
		dispatch(setConfigs(_newConfigs));
	};

	const _setConfig = (_newConfig: TConfig) => {
		dispatch(setConfig(_newConfig));
	};

	const _setTxtConfig = (_newTxtConfig: string) => {
		dispatch(setTxtConfig(_newTxtConfig));
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
		window.electron.getConfigByHost(host).then((_res) => {
			_setTxtConfig(_res.txt);
			_setConfig(_res.config);
		});
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
			.editTxtConfigs(fileContent)
			.then(({ txt, list }) => {
				_setTxtConfigs(txt);
				_setConfigs(list);
			})
			.then(() => toast('Config has been changed'));
	};

	const editTxtConfig = (newTxtConfig: string) => {
		return window.electron
			.editTxtConfig(txtConfig, newTxtConfig)
			.then(({ txt, list }) => {
				_setTxtConfigs(txt);
				_setConfigs(list);
				if (config) {
					if (configId) {
						const isEqual =
							configId === config?.Host || configId === config?.HostName;
						if (isEqual) {
							_setConfig(
								list.find(
									(item) =>
										configId === item?.Host || configId === item?.HostName
								)
							);
						}
					}
				}
			})
			.then(() => toast('Config has been changed'));
		// 	return window.electron
		// 		.editTxtConfig(,txtConfigContent)
		// 		.then(({ txt, list }) => {
		// 			_setTxtConfigs(txt);
		// 			_setConfigs(list);
		// 		})
		// 		.then(() => toast('Config has been changed'));
	};

	return {
		state: {
			configs,
			config,
			txtConfigs,
			txtConfig,
		},
		getConfigs,
		getConfig,
		getTxtConfigs,
		editTxtConfigs,
		editTxtConfig,
		createConfig,
		deleteConfig,
		refreshConfigs,
	};
};
