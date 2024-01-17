import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@shared/constants';
import { useConfig } from '@shared/hooks';
import { TFile } from '@shared/types';
import ConfigPageContainer from '@widgets/config-page-container';
import CustomButton from '@widgets/custom-button';
import CustomDropzone from '@widgets/custom-dropzone';
import CustomInput from '@widgets/custom-input';
import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { StyledNewConfigPage, StyledNewConfigPageForm } from './styles';

const schema = yup
	.object({
		config: yup.string().required('This field is required'),
	})
	.required();

const NewConfigPage: FC = () => {
	const [file, setFile] = useState<TFile | undefined>(undefined);
	const navigate = useNavigate();
	const { createConfig } = useConfig();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			config: 'Host ness\n  HostName lochness.com\n  User dinosaur',
		},
	});

	const onSubmit = handleSubmit(({ config }) => {
		createConfig(config, file).then(() => navigate(ROUTES.ROOT));
	});

	const onRemoveFile = useCallback(() => {
		setFile(undefined);
	}, [setValue]);

	const onLoadFile = (obj: TFile) => {
		setFile(obj);
	};

	return (
		<ConfigPageContainer title="Create new config">
			<StyledNewConfigPage>
				<StyledNewConfigPageForm onSubmit={onSubmit}>
					<CustomInput
						rows={5}
						formProps={register('config')}
						label="Enter your config:"
						errorMessage={errors?.config?.message}
						variant="textarea"
					/>
					<CustomDropzone
						fileName={file?.name}
						onLoadFile={onLoadFile}
						onRemoveFile={onRemoveFile}
					/>
					<CustomButton type="submit">Create config</CustomButton>
				</StyledNewConfigPageForm>
			</StyledNewConfigPage>
		</ConfigPageContainer>
	);
};

export default NewConfigPage;
