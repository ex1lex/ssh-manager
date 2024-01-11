import { ROUTES } from '@shared/constants';
import { Navigate, Route, Routes } from 'react-router-dom';

import ConfigLayout from './config-layout';
import ConfigPage from './config-page';
import ConfigPlaceholderPage from './config-placeholder-page';
import NewConfigPage from './new-config-page';
import TxtConfigPage from './txt-config-page';

const Roter = () => {
	return (
		<Routes>
			<Route element={<ConfigLayout />}>
				<Route path={ROUTES.ROOT} element={<ConfigPlaceholderPage />} />
				<Route path={ROUTES.NEW_CONFIG} element={<NewConfigPage />} />
				<Route path={ROUTES.TXT_CONFIG} element={<TxtConfigPage />} />
				<Route path={ROUTES.CONFIG} element={<ConfigPage />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Route>
		</Routes>
	);
};

export default Roter;
