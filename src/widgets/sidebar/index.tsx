import Actions from '@widgets/actions';
import ConfigsList from '@widgets/configs-list';
import React, { FC } from 'react';

import { StyledSidebar, StyledSidebarContainer } from './styles';

const Sidebar: FC = () => {
	return (
		<StyledSidebar>
			<Actions />
			<StyledSidebarContainer>
				<ConfigsList />
			</StyledSidebarContainer>
		</StyledSidebar>
	);
};

export default Sidebar;
