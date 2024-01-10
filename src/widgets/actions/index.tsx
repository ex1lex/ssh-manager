import { ROUTES } from '@shared/constants';
import { useConfig } from '@shared/hooks';
import CustomButton from '@widgets/custom-button';
import RefreshIcon from '@widgets/refresh-icon';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

const Actions: FC = () => {
	const navigate = useNavigate();
	const { onRefresh } = useConfig();

	const onCreateNewConfig = () => {
		navigate(ROUTES.NEW_CONFIG);
	};

	return (
		<div className={styles.actions}>
			<CustomButton title="Create config" onClick={onCreateNewConfig} />
			<CustomButton
				variant="outlined"
				title={<RefreshIcon />}
				onClick={onRefresh}
			/>
		</div>
	);
};

export default Actions;
