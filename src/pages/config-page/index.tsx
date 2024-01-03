import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';

const ConfigPage: FC = () => {
	const { configId } = useParams();
	const config = window.electron.getConfigByHost(configId);

	if (!config) return null;

	return (
		<div className={styles['config-page']}>
			<div className={styles['config-page__container']}>
				<h4 className={styles['config-page__title']}>Config {config.value}</h4>
				<ul className={styles['config-page__list']}>
					<li className={styles['config-page__item']}>
						<p className={styles['config-page__key']}>
							{[config.param]}:
							<span className={styles['config-page__value']}>
								{[config.value]}
							</span>
						</p>
					</li>
					{config.config.map((item: any) => {
						if (!item?.param) return null;

						return (
							<li className={styles['config-page__item']}>
								<p className={styles['config-page__key']}>
									{[item.param]}:
									<span className={styles['config-page__value']}>
										{[item.value]}
									</span>
								</p>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ConfigPage;
