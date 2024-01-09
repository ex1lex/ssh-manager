import { useConfig } from '@shared/hooks';
import RefreshIcon from '@widgets/refresh-icon';
import classNames from 'classnames';
import React, { FC } from 'react';

import styles from './styles.module.scss';

const Actions: FC = () => {
	const { onRefresh } = useConfig();

	return (
		<div className={styles.actions}>
			<button className={styles.actions__btn} type="button">
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
