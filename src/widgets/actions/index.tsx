import { ROUTES } from '@shared/constants';
import { useConfig } from '@shared/hooks';
import CustomButton from '@widgets/custom-button';
import FileIcon from '@widgets/file-icon';
import PlusIcon from '@widgets/plus-icon';
import RefreshIcon from '@widgets/refresh-icon';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

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
		<div className={styles.actions}>
			<CustomButton
				variant="outlined"
				title={<PlusIcon />}
				onClick={onCreateNewConfigClick}
			/>
			<CustomButton
				variant="outlined"
				title={<FileIcon />}
				onClick={onShowTxtConfigClick}
			/>
			<CustomButton
				variant="outlined"
				title={<RefreshIcon />}
				onClick={refreshConfigs}
			/>
		</div>
	);
};

export default Actions;
