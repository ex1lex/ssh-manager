import { yupResolver } from '@hookform/resolvers/yup';
import { useConfig } from '@shared/hooks';
import ConfigPageContainer from '@widgets/config-page-container';
import CustomButton from '@widgets/custom-button';
import CustomInput from '@widgets/custom-input';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './styles.module.scss';

const schema = yup
	.object({
		config: yup.string().required('This field is required'),
	})
	.required();

const TxtConfigPage: FC = () => {
	const [isEditMode, setIsEditMode] = useState<boolean>();
	const txtRef = useRef<HTMLParagraphElement>();

	const {
		getTxtConfig,
		editTxtConfig,
		state: { txtConfig },
	} = useConfig();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			config: txtConfig,
		},
	});

	const onSubmit = handleSubmit(({ config }) => {
		console.log('test', config);
		editTxtConfig(config).then(() => toggleEditMode());
	});

	const onEditClick = useCallback(() => {
		toggleEditMode();
	}, []);

	const toggleEditMode = useCallback(() => {
		setIsEditMode(!isEditMode);
	}, [isEditMode]);

	useEffect(() => {
		setValue('config', txtConfig);
	}, [txtConfig]);

	useEffect(() => {
		getTxtConfig();
	}, []);

	if (isEditMode) {
		return (
			<ConfigPageContainer showHeader title="Contents of the config file">
				<div className={styles['txt-config-page']}>
					<form onSubmit={onSubmit} className={styles['txt-config-page__form']}>
						<CustomInput
							formProps={{
								...register('config'),
								className: styles['txt-config-page__textarea'],
								style: {
									height: `${txtRef.current?.scrollHeight + 30}px`,
								},
							}}
							errorMessage={errors?.config?.message}
							variant="textarea"
						/>
						<div className={styles['txt-config-page__container']}>
							<CustomButton
								color="danger"
								title="Cancel"
								type="button"
								onClick={toggleEditMode}
							/>
							<CustomButton title="Save config" type="submit" />
						</div>
					</form>
				</div>
			</ConfigPageContainer>
		);
	}

	return (
		<ConfigPageContainer showHeader title="Contents of the config file">
			<div className={styles['txt-config-page']}>
				<p ref={txtRef} className={styles['txt-config-page__text']}>
					{txtConfig}
				</p>
				<CustomButton title="Edit" type="button" onClick={onEditClick} />
			</div>
		</ConfigPageContainer>
	);
};

export default TxtConfigPage;
