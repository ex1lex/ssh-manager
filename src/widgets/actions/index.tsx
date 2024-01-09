import { ROUTES } from '@shared/constants';
import { useConfig } from '@shared/hooks';
import RefreshIcon from '@widgets/refresh-icon';
import classNames from 'classnames';
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
			<button
				className={styles.actions__btn}
				type="button"
				onClick={onCreateNewConfig}
			>
				Create config
			</button>
			<button
				className={classNames(
					styles.actions__btn,
					styles.actions__btn_type_svg
				)}
				type="button"
				onClick={onRefresh}
			>
				<RefreshIcon />
			</button>
		</div>
	);
};

export default Actions;
