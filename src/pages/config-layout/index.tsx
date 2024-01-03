import React, { FC } from 'react';
import Sidebar from '../../widgets/sidebar';
import styles from './styles.module.scss';
import { Outlet } from 'react-router-dom';

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
