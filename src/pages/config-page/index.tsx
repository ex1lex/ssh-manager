import { ROUTES } from '@shared/constants';
import { useConfig } from '@shared/hooks';
import ConfigPageContainer from '@widgets/config-page-container';
import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './styles.module.scss';

const ConfigPage: FC = () => {
	const navigate = useNavigate();
	const { configId } = useParams();
	const {
		getConfig,
		state: { config },
	} = useConfig();

	const values = useMemo(() => {
		return Object.keys(config || {}).map((key) => {
			return {
				param: key,
				value: config?.[key],
			};
		});
	}, [config]);

	useEffect(() => {
		getConfig(configId);
	}, [configId]);

	if (!config) {
		navigate(ROUTES.ROOT);
		return null;
	}

	return (
		<ConfigPageContainer showHeader title={`Config ${config.Host}`}>
			<ul className={styles['config-page']}>
				{values.map((item: any) => {
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
