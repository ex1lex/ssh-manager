import { Navigate, Route, Routes } from 'react-router-dom';
import ConfigPlaceholderPage from './config-placeholder-page';
import ConfigLayout from './config-layout';
import ConfigPage from './config-page';

const Roter = () => {
	return (
		<Routes>
			<Route element={<ConfigLayout />}>
				<Route path="/" element={<ConfigPlaceholderPage />} />
				<Route path="/:configId" element={<ConfigPage />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Route>
		</Routes>
	);
};

export default Roter;
