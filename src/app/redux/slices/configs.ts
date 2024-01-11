import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConfig } from '@shared/types';

import { useAppSelector } from '..';

interface IState {
	configs: TConfig[];
	config?: TConfig;
	txtConfig?: string;
}

const initialState: IState = {
	configs: [],
	config: undefined,
	txtConfig: undefined,
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
		setTxtConfig: (state, action: PayloadAction<string>) => {
			state.txtConfig = action.payload;
		},
	},
});

export const { setConfigs, setConfig, setTxtConfig } = configsSlice.actions;

export const getConfigsSelector = () =>
	useAppSelector((state) => state[configsSlice.reducerPath].configs);

export const getConfigSelector = () =>
	useAppSelector((state) => state[configsSlice.reducerPath].config);

export const getTxtConfigSelector = () =>
	useAppSelector((state) => state[configsSlice.reducerPath].txtConfig);

export default configsSlice;
