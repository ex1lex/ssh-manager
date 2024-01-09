import { Sidebar } from '@widgets';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

const ConfigLayout: FC = () => {
	return (
		<div className={styles['config-layout']}>
			<Sidebar />
			<div className={styles['config-layout__content']}>
				<Outlet />
			</div>
		</div>
	);
};

export default ConfigLayout;
