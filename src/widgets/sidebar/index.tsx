import React, { FC } from 'react';
import styles from './styles.module.scss';
import Actions from '../actions';
import ConfigsList from '../configs-list';

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Actions />
			<ConfigsList />
		</div>
	);
};

export default Sidebar;
