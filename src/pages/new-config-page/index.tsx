import { yupResolver } from '@hookform/resolvers/yup';
import { useConfig } from '@shared/hooks';
import ConfigPageContainer from '@widgets/config-page-container';
import CustomButton from '@widgets/custom-button';
import CustomInput from '@widgets/custom-input';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './styles.module.scss';

const schema = yup
	.object({
		config: yup.string().required('This field is required'),
	})
	.required();

const NewConfigPage: FC = () => {
	const { createConfig } = useConfig();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(({ config }) => {
		createConfig(config);
	});

	return (
		<ConfigPageContainer title="Create new config">
			<div className={styles['new-config-page']}>
				<form onSubmit={onSubmit} className={styles['new-config-page__form']}>
					<CustomInput
						formProps={register('config')}
						label="Enter your config:"
						errorMessage={errors?.config?.message}
						variant="textarea"
					/>
					<CustomButton title="Create config" type="submit" />
				</form>
			</div>
		</ConfigPageContainer>
	);
};

export default NewConfigPage;
