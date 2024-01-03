import React, { FC } from 'react';

import styles from './styles.module.scss';

const Actions: FC = () => {
	return (
		<div className={styles.actions}>
			<button className={styles.actions__btn} type="button">
				Create config
			</button>
		</div>
	);
};

export default Actions;
