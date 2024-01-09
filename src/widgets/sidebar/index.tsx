import Actions from '@widgets/actions';
import ConfigsList from '@widgets/configs-list';
import React, { FC } from 'react';

import styles from './styles.module.scss';

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Actions />
			<ConfigsList />
		</div>
	);
};

export default Sidebar;
