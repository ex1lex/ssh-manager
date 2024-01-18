import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@shared/constants';
import { useConfig } from '@shared/hooks';
import ConfigPageContainer from '@widgets/config-page-container';
import CustomButton from '@widgets/custom-button';
import CustomInput from '@widgets/custom-input';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import {
	StyledConfigPage,
	StyledConfigPageContainer,
	StyledConfigPageForm,
	StyledConfigPageItem,
	StyledConfigPageKey,
	StyledConfigPageList,
	StyledConfigPageValue,
} from './styles';

const schema = yup
	.object({
		txtConfig: yup.string().required('This field is required'),
	})
	.required();

const ConfigPage: FC = () => {
	const [isEdit, setIsEdit] = useState<boolean>();
	const navigate = useNavigate();
	const { configId } = useParams();
	const {
		getConfig,
		editTxtConfig,
		state: { config, txtConfig },
	} = useConfig();

	const values = useMemo(() => {
		return Object.keys(config || {}).map((key) => {
			return {
				param: key,
				value: config?.[key],
			};
		});
	}, [config]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			txtConfig: txtConfig,
		},
	});

	const onSubmit = handleSubmit(({ txtConfig }) => {
		console.log('SUBMIT:', txtConfig);
		editTxtConfig(txtConfig);
		setIsEdit(!isEdit);
	});

	const editToggle = useCallback(() => {
		if (isEdit) {
			console.log('cancel');
		}
		setIsEdit(!isEdit);
	}, [isEdit]);

	useEffect(() => {
		getConfig(configId);
	}, [configId]);

	useEffect(() => {
		setValue('txtConfig', txtConfig);
	}, [txtConfig]);

	if (!config) {
		navigate(ROUTES.ROOT);
		return null;
	}

	if (isEdit) {
		return (
			<ConfigPageContainer showHeader title={`Config ${config.Host}`}>
				<StyledConfigPage>
					<StyledConfigPageForm onSubmit={onSubmit}>
						<CustomInput
							rows={7}
							formProps={register('txtConfig')}
							label="Edit your config:"
							errorMessage={errors?.txtConfig?.message}
							variant="textarea"
						/>
						<StyledConfigPageContainer>
							<CustomButton type="button" color="danger" onClick={editToggle}>
								Cancel
							</CustomButton>
							<CustomButton type="submit">Save</CustomButton>
						</StyledConfigPageContainer>
					</StyledConfigPageForm>
				</StyledConfigPage>
			</ConfigPageContainer>
		);
	}

	return (
		<ConfigPageContainer showHeader title={`Config ${config.Host}`}>
			<StyledConfigPage>
				<StyledConfigPageList>
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
				</StyledConfigPageList>
				<StyledConfigPageContainer>
					<CustomButton type="button" onClick={editToggle}>
						Edit
					</CustomButton>
				</StyledConfigPageContainer>
			</StyledConfigPage>
		</ConfigPageContainer>
	);
};

export default ConfigPage;
