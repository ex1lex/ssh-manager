import { useAppDispatch } from '@app/redux';
import { getConfigSelector, setConfigs } from '@app/redux/slices/configs';
import { TConfig } from '@shared/types';
import { useEffect } from 'react';

export const useConfig = () => {
	const dispatch = useAppDispatch();

	const configs: TConfig[] = getConfigSelector();

	const _getConfigs = async () => {
		const newConfig: any = await window.electron.getListOfConfigs();
		dispatch(setConfigs(newConfig));
	};

	const getConfig = (val: string): TConfig | undefined => {
		return configs.find((item: any) => item?.value?.toString() === val);
	};

	const onDelete = async (val: string) => {
		const newConfig: any = await window.electron.deleteConfig(val);
		dispatch(setConfigs(newConfig));
	};

	const onRefresh = async () => {
		await _getConfigs();
	};

	const createConfig = async (newConfig: TConfig) => {
		await window.electron.createConfig(newConfig);
		_getConfigs();
	};

	useEffect(() => {
		if (!configs.length) {
			_getConfigs();
		}
	}, []);

	return { configs, onDelete, onRefresh, getConfig, createConfig };
};
