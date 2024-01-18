import { Theme } from '@app/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useConfig } from '@shared/hooks';
import ConfigPageContainer from '@widgets/config-page-container';
import CustomButton from '@widgets/custom-button';
import CustomInput from '@widgets/custom-input';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
	StyledTxtConfigPage,
	StyledTxtConfigPageContainer,
	StyledTxtConfigPageForm,
	StyledTxtConfigPageText,
} from './styles';

const schema = yup
	.object({
		config: yup.string().required('This field is required'),
	})
	.required();

const TxtConfigPage: FC = () => {
	const [isEditMode, setIsEditMode] = useState<boolean>();
	const txtRef = useRef<HTMLParagraphElement>();

	const {
		getTxtConfigs,
		editTxtConfigs,
		state: { txtConfigs },
	} = useConfig();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			config: txtConfigs,
		},
	});

	const onSubmit = handleSubmit(({ config }) => {
		console.log('test', config);
		editTxtConfigs(config).then(() => toggleEditMode());
	});

	const onEditClick = useCallback(() => {
		toggleEditMode();
	}, []);

	const toggleEditMode = useCallback(() => {
		setIsEditMode(!isEditMode);
	}, [isEditMode]);

	useEffect(() => {
		setValue('config', txtConfigs);
	}, [txtConfigs]);

	useEffect(() => {
		getTxtConfigs();
	}, []);

	if (isEditMode) {
		const current = txtRef.current;

		return (
			<ConfigPageContainer showHeader title="Contents of the config file">
				<StyledTxtConfigPage>
					<StyledTxtConfigPageForm onSubmit={onSubmit}>
						<CustomInput
							formProps={{
								...register('config'),
								style: {
									height: `${current?.scrollHeight + 30}px`,
									color: Theme.colors.text,
									fontStyle: 'normal',
									fontSize: '16px',
									fontWeight: 'normal',
									lineHeight: '24px',
								},
							}}
							errorMessage={errors?.config?.message}
							variant="textarea"
						/>
						<StyledTxtConfigPageContainer>
							<CustomButton
								color="danger"
								type="button"
								onClick={toggleEditMode}
							>
								Cancel
							</CustomButton>
							<CustomButton type="submit">Save config</CustomButton>
						</StyledTxtConfigPageContainer>
					</StyledTxtConfigPageForm>
				</StyledTxtConfigPage>
			</ConfigPageContainer>
		);
	}

	return (
		<ConfigPageContainer showHeader title="Contents of the config file">
			<StyledTxtConfigPage>
				<StyledTxtConfigPageText ref={txtRef}>
					{txtConfigs}
				</StyledTxtConfigPageText>
				<StyledTxtConfigPageContainer>
					<CustomButton type="button" onClick={onEditClick}>
						Edit
					</CustomButton>
				</StyledTxtConfigPageContainer>
			</StyledTxtConfigPage>
		</ConfigPageContainer>
	);
};

export default TxtConfigPage;
