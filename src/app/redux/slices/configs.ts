import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { useAppSelector } from '..';
import { TConfig } from '../../../shared';

interface IState {
	configs: TConfig[];
}

const initialState: IState = {
	configs: [],
};

const configsSlice = createSlice({
	name: 'configs',
	initialState,
	reducers: {
		setConfigs: (state, action: PayloadAction<Record<string, any>[]>) => {
			state.configs = action.payload;
		},
	},
});

export const { setConfigs } = configsSlice.actions;

export const getConfigSelector = () =>
	useAppSelector((state) => state[configsSlice.reducerPath].configs);

export default configsSlice;
