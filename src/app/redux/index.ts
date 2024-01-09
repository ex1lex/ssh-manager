import { configureStore } from '@reduxjs/toolkit';

import configsSlice from './slices/configs';

export * from './hooks';

const store = configureStore({
	reducer: {
		configs: configsSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
