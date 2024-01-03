import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ConfigPageContainer from '../../widgets/config-page-container';
import styles from './styles.module.scss';

const ConfigPage: FC = () => {
	const [config, setConfig] = useState(undefined);

	const { configId } = useParams();

	const getConfig = async () => {
		const _config = await window.electron.getConfigByHost(configId);
		setConfig(_config);
	};

	useEffect(() => {
		getConfig();
	}, [configId]);

	if (!config) return null;

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
