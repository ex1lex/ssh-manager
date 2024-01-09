import store from '@app/redux';
import Router from '@pages';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@app/styles/index.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter basename="/main_window">
				<Router />
			</BrowserRouter>
			<ToastContainer />
		</Provider>
	</React.StrictMode>
);
