import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES, useConfig } from '../../shared';
import ConfigPageContainer from '../../widgets/config-page-container';
import styles from './styles.module.scss';

const ConfigPage: FC = () => {
	const navigate = useNavigate();
	const { configId } = useParams();
	const { getConfig } = useConfig();

	const config = getConfig(configId);

	if (!config) {
		navigate(ROUTES.ROOT);
		return null;
	}

	return (
		<ConfigPageContainer title={`Config ${config.value}`}>
			<ul className={styles['config-page']}>
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
						<li
							key={`config-page-item-${item.param}`}
							className={styles['config-page__item']}
						>
							<p className={styles['config-page__key']}>
								{item.param}:
								<span className={styles['config-page__value']}>
									{item.value}
								</span>
							</p>
						</li>
					);
				})}
			</ul>
		</ConfigPageContainer>
	);
};

export default ConfigPage;
