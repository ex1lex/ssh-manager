import store from '@app/redux';
import Router from '@pages';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, Theme } from './styles';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={Theme}>
				<GlobalStyles />
				<BrowserRouter basename="/main_window">
					<Router />
				</BrowserRouter>
				<ToastContainer />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
