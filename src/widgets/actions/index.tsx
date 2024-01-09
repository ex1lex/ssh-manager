import { Icons, useConfig } from '@shared';
import { SvgIcon } from '@widgets';
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
				<SvgIcon icon={Icons.refresh} />
			</button>
		</div>
	);
};

export default Actions;
