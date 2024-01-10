import classNames from 'classnames';
import React, { FC, useCallback, useId } from 'react';

import styles from './styles.module.scss';

interface Props {
	label?: string;
	errorMessage?: string;
	cols?: number;
	variant?: 'input' | 'textarea';
	formProps?: Record<string, any>;
}

const CustomInput: FC<Props> = ({
	label,
	variant = 'input',
	errorMessage,
	formProps,
	cols = 5,
}) => {
	const id = useId();

	const Component = useCallback(() => {
		const _props: Record<string, any> = {
			...formProps,
			className: classNames(styles['custom-input__input'], {
				[styles['custom-input__input_type_error']]: !!errorMessage,
				[styles['custom-input__input_type_disabled']]: !!formProps?.disabled,
			}),
			id,
		};
		switch (variant) {
			case 'textarea':
				_props['cols'] = cols;
				return <textarea {..._props} />;
			case 'input':
			default:
				return <input {..._props} />;
		}
	}, [variant]);

	return (
		<div className={styles['custom-input']}>
			{label && (
				<label className={styles['custom-input__label']} htmlFor={id}>
					{label}
				</label>
			)}
			<Component />
			{errorMessage && (
				<p className={styles['custom-input__error']} role="alert">
					{errorMessage}
				</p>
			)}
		</div>
	);
};

export default CustomInput;
