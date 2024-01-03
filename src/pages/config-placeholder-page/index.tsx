import React, { FC } from 'react';

import ConfigPageContainer from '../../widgets/config-page-container';
import styles from './styles.module.scss';

const ConfigPlaceholderPage: FC = () => {
	return (
		<ConfigPageContainer>
			<p className={styles['config-placeholder-page']}>Select config</p>
		</ConfigPageContainer>
	);
};

export default ConfigPlaceholderPage;
