import ConfigPageContainer from '@widgets/config-page-container';
import React, { FC } from 'react';

import styles from './styles.module.scss';

const ConfigPlaceholderPage: FC = () => {
	return (
		<ConfigPageContainer>
			<p className={styles['config-placeholder-page']} />
		</ConfigPageContainer>
	);
};

export default ConfigPlaceholderPage;
