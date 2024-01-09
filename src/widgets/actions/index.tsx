import classNames from 'classnames';
import React, { FC } from 'react';

import SvgIcon, { Icons } from '../svg-icon';
import styles from './styles.module.scss';

const Actions: FC = () => {
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
			>
				<SvgIcon icon={Icons.refresh} />
			</button>
		</div>
	);
};

export default Actions;
