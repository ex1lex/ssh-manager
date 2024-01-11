import { useConfig } from '@shared/hooks';
import React, { FC, useMemo } from 'react';

import styles from './styles.module.scss';

interface Props {
	title?: string;
}

const ConfigPageHeader: FC<Props> = ({ title }) => {
	return (
		<header className={styles['config-page-header']}>
			<p className={styles['config-page-header__title']}>{title}</p>
		</header>
	);
};

export default ConfigPageHeader;
