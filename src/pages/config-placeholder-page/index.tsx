import React, { FC } from 'react';
import styles from './styles.module.scss';

const ConfigPlaceholderPage: FC = () => {
	return (
		<div className={styles['config-placeholder-page']}>
			<p className={styles['config-placeholder-page__text']}>Select config</p>
		</div>
	);
};

export default ConfigPlaceholderPage;
