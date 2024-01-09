import { useEffect } from 'react';

import { useAppDispatch } from '../../app/redux';
import { getConfigSelector, setConfigs } from '../../app/redux/slices/configs';

export const useConfig = () => {
	const dispatch = useAppDispatch();

	const configs = getConfigSelector();

	const getConfigs = async () => {
		const newConfig: any = await window.electron.getListOfConfigs();
		dispatch(setConfigs(newConfig));
	};

	const onDelete = async (val: string) => {
		const newConfig: any = await window.electron.deleteConfig(val);
		dispatch(setConfigs(newConfig));
	};

	const onRefresh = async () => {
		await getConfigs();
	};

	useEffect(() => {
		getConfigs();
	}, []);

	return { configs, onDelete, onRefresh };
};
