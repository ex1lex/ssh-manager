import { ConfigPageContainer } from '@widgets';
import React, { FC } from 'react';

import styles from './styles.module.scss';

const ConfigPlaceholderPage: FC = () => {
	return (
		<ConfigPageContainer>
			<p className={styles['config-placeholder-page']}>Select config</p>
		</ConfigPageContainer>
	);
};

export default ConfigPlaceholderPage;
