import { ROUTES } from '@shared/constants';
import { useConfig } from '@shared/hooks';
import ConfigPageContainer from '@widgets/config-page-container';
import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
	StyledConfigPage,
	StyledConfigPageItem,
	StyledConfigPageKey,
	StyledConfigPageValue,
} from './styles';

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
			<StyledConfigPage>
				{values.map((item: any) => {
					if (!item?.param) return null;

					return (
						<StyledConfigPageItem key={`config-page-item-${item.param}`}>
							<StyledConfigPageKey>
								{item.param}:
								<StyledConfigPageValue>{item.value}</StyledConfigPageValue>
							</StyledConfigPageKey>
						</StyledConfigPageItem>
					);
				})}
			</StyledConfigPage>
		</ConfigPageContainer>
	);
};

export default ConfigPage;
