import React, { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
	children: React.ReactNode;
	title?: string;
}

const ConfigPageContainer: FC<Props> = ({ children, title }) => {
	return (
		<div className={styles['config-page-container']}>
			<div className={styles['config-page-container__container']}>
				{title && (
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
