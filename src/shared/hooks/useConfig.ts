import { useEffect } from 'react';

import { useAppDispatch } from '../../app/redux';
import { getConfigSelector, setConfigs } from '../../app/redux/slices/configs';

const useConfig = () => {
	const configs = getConfigSelector();
	console.log('test1', configs);

	const dispatch = useAppDispatch();

	const getConfigs = async () => {
		const newConfig: any = await window.electron.getListOfConfigs();
		dispatch(setConfigs(newConfig));
	};

	const onDelete = async (val: string) => {
		const newConfig: any = await window.electron.deleteConfig(val);
		dispatch(setConfigs(newConfig));
	};

	useEffect(() => {
		getConfigs();
	}, []);
	return { configs, onDelete };
};

export default useConfig;
