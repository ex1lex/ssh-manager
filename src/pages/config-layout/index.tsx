import Sidebar from '@widgets/sidebar';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { StyledConfigLayout, StyledConfigLayoutContent } from './styles';

const ConfigLayout: FC = () => {
	return (
		<StyledConfigLayout>
			<Sidebar />
			<StyledConfigLayoutContent>
				<Outlet />
			</StyledConfigLayoutContent>
		</StyledConfigLayout>
	);
};

export default ConfigLayout;
