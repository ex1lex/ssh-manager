import ConfigPageHeader from '@widgets/config-page-header';
import React, { FC } from 'react';

import {
	StyledConfigPageContainer,
	StyledConfigPageContainerContainer,
	StyledConfigPageContainerContent,
	StyledConfigPageContainerTitle,
} from './styles';

interface Props {
	children: React.ReactNode;
	title?: string;
	showHeader?: boolean;
}

const ConfigPageContainer: FC<Props> = ({ children, title, showHeader }) => {
	return (
		<StyledConfigPageContainer>
			{showHeader && <ConfigPageHeader title={title} />}
			<StyledConfigPageContainerContainer>
				{!showHeader && title && (
					<StyledConfigPageContainerTitle>
						{title}
					</StyledConfigPageContainerTitle>
				)}
				<StyledConfigPageContainerContent>
					{children}
				</StyledConfigPageContainerContent>
			</StyledConfigPageContainerContainer>
		</StyledConfigPageContainer>
	);
};

export default ConfigPageContainer;
