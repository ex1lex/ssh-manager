import Actions from '@widgets/actions';
import ConfigsList from '@widgets/configs-list';
import React, { FC } from 'react';

import styles from './styles.module.scss';

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Actions />
			<div className={styles['sidebar__container']}>
				<ConfigsList />
			</div>
		</div>
	);
};

export default Sidebar;
