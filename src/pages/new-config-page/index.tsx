import { yupResolver } from '@hookform/resolvers/yup';
import ConfigPageContainer from '@widgets/config-page-container';
import CustomButton from '@widgets/custom-button';
import CustomInput from '@widgets/custom-input';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './styles.module.scss';

const schema = yup
	.object({
		textarea: yup.string().required('This field is required'),
	})
	.required();

const NewConfigPage: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit((data) => {
		console.log('VALUES:', data);
		// createConfig({
		// 	Host: 'yandex',
		// 	HostName: 'ya.ru',
		// });
	});

	return (
		<ConfigPageContainer title="Create new config">
			<div className={styles['new-config-page']}>
				<form onSubmit={onSubmit} className={styles['new-config-page__form']}>
					<CustomInput
						formProps={register('textarea')}
						label="Enter your config:"
						errorMessage={errors?.textarea?.message}
						variant="textarea"
					/>
					<CustomButton title="Create config" type="submit" />
				</form>
			</div>
		</ConfigPageContainer>
	);
};

export default NewConfigPage;
