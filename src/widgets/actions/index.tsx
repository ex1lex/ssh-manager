import { ROUTES } from '@shared/constants';
import { useConfig } from '@shared/hooks';
import CustomButton from '@widgets/custom-button';
import FileIcon from '@widgets/file-icon';
import PlusIcon from '@widgets/plus-icon';
import RefreshIcon from '@widgets/refresh-icon';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { StyledActions } from './styles';

const Actions: FC = () => {
	const navigate = useNavigate();
	const { refreshConfigs } = useConfig();

	const onCreateNewConfigClick = useCallback(() => {
		navigate(ROUTES.NEW_CONFIG);
	}, [navigate]);

	const onShowTxtConfigClick = useCallback(() => {
		navigate(ROUTES.TXT_CONFIG);
	}, [navigate]);

	return (
		<StyledActions>
			<CustomButton
				variant="outline"
				color="primary"
				onClick={onCreateNewConfigClick}
			>
				<PlusIcon />
			</CustomButton>
			<CustomButton
				variant="outline"
				color="primary"
				onClick={onShowTxtConfigClick}
			>
				<FileIcon />
			</CustomButton>
			<CustomButton variant="outline" color="primary" onClick={refreshConfigs}>
				<RefreshIcon />
			</CustomButton>
		</StyledActions>
	);
};

export default Actions;
