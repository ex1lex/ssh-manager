import { useConfig } from '@shared/hooks';
import ConfigPageContainer from '@widgets/config-page-container';
import React, { FC, useEffect } from 'react';

import styles from './styles.module.scss';

const TxtConfigPage: FC = () => {
	const {
		getTxtConfig,
		state: { txtConfig },
	} = useConfig();

	useEffect(() => {
		getTxtConfig();
	}, []);

	return (
		<ConfigPageContainer showHeader title="Contents of the config file">
			<div className={styles['txt-config-page']}>
				<p className={styles['txt-config-page__text']}>{txtConfig}</p>
			</div>
		</ConfigPageContainer>
	);
};

export default TxtConfigPage;
