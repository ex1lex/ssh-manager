import React, { FC } from 'react';

import { StyledConfigPageHeader, StyledConfigPageHeaderTitle } from './styles';

interface Props {
	title?: string;
}

const ConfigPageHeader: FC<Props> = ({ title }) => {
	return (
		<StyledConfigPageHeader>
			<StyledConfigPageHeaderTitle>{title}</StyledConfigPageHeaderTitle>
		</StyledConfigPageHeader>
	);
};

export default ConfigPageHeader;
