import ConfigPageContainer from '@widgets/config-page-container';
import React, { FC } from 'react';

import { StyledPlaceholder } from './styles';

const ConfigPlaceholderPage: FC = () => {
	return (
		<ConfigPageContainer>
			<StyledPlaceholder />
		</ConfigPageContainer>
	);
};

export default ConfigPlaceholderPage;
