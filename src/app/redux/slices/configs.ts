import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, useAppSelector } from '..';

interface IState {
	configs: Record<string, any>[];
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
