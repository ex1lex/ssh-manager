import ConfigPageHeader from '@widgets/config-page-header';
import React, { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
	children: React.ReactNode;
	title?: string;
	showHeader?: boolean;
}

const ConfigPageContainer: FC<Props> = ({ children, title, showHeader }) => {
	return (
		<div className={styles['config-page-container']}>
			{showHeader && <ConfigPageHeader title={title} />}
			<div className={styles['config-page-container__container']}>
				{!showHeader && title && (
					<h4 className={styles['config-page-container__title']}>{title}</h4>
				)}
				<div className={styles['config-page-container__content']}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default ConfigPageContainer;
