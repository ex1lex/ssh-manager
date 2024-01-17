import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConfig } from '@shared/types';

import { useAppSelector } from '..';

interface IState {
	configs: TConfig[];
	config?: TConfig;
	txtConfigs?: string;
}

const initialState: IState = {
	configs: [],
	config: undefined,
	txtConfigs: undefined,
};

const configsSlice = createSlice({
	name: 'configs',
	initialState,
	reducers: {
		setConfigs: (state, action: PayloadAction<TConfig[]>) => {
			state.configs = action.payload;
		},
		setConfig: (state, action: PayloadAction<TConfig>) => {
			state.config = action.payload;
		},
		setTxtConfigs: (state, action: PayloadAction<string>) => {
			state.txtConfigs = action.payload;
		},
	},
});

export const { setConfigs, setConfig, setTxtConfigs } = configsSlice.actions;

export const getConfigsSelector = () =>
	useAppSelector((state) => state[configsSlice.reducerPath].configs);

export const getConfigSelector = () =>
	useAppSelector((state) => state[configsSlice.reducerPath].config);

export const getTxtConfigsSelector = () =>
	useAppSelector((state) => state[configsSlice.reducerPath].txtConfigs);

export default configsSlice;
