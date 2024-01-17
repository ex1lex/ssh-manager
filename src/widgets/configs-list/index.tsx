import { ROUTES } from '@shared/constants';
import { useConfig } from '@shared/hooks';
import DeleteIcon from '@widgets/delete-icon';
import EditIcon from '@widgets/edit-icon';
import React, { FC, useEffect } from 'react';

import {
	StyledConfigList,
	StyledConfigListActions,
	StyledConfigListItem,
	StyledConfigListLink,
	StyledConfigListList,
	StyledCustomButton,
} from './styles';

const ConfigsList: FC = () => {
	const {
		state: { configs },
		deleteConfig,
		getConfigs,
	} = useConfig();

	const onDeleteConfigClick = async (val: string) => {
		deleteConfig(val);
	};

	const onEditConfigClick = (val: string) => {
		console.log('EDIT', val);
	};

	useEffect(() => {
		getConfigs();
	}, []);

	return (
		<StyledConfigList>
			<StyledConfigListList>
				{configs?.map((_value: any) => {
					const value = _value?.Host;
					if (!value) {
						return null;
					}
					const link = ROUTES.CONFIG.replace(':configId', value);
					return (
						<StyledConfigListItem key={`configs-list-item-${value}`}>
							<StyledConfigListLink to={link}>{value}</StyledConfigListLink>
							<StyledConfigListActions>
								<StyledCustomButton
									variant="simple"
									color="currentColor"
									onClick={() => onEditConfigClick(value)}
								>
									<EditIcon />
								</StyledCustomButton>
								<StyledCustomButton
									variant="simple"
									color="currentColor"
									onClick={() => onDeleteConfigClick(value)}
								>
									<DeleteIcon />
								</StyledCustomButton>
							</StyledConfigListActions>
						</StyledConfigListItem>
					);
				})}
			</StyledConfigListList>
		</StyledConfigList>
	);
};

export default ConfigsList;
