import classNames from 'classnames';
import React, { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
	title: string | React.ReactElement;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	variant?: 'outlined' | 'contained';
}

const CustomButton: FC<Props> = ({
	type = 'button',
	title,
	onClick,
	variant = 'contained',
}) => {
	return (
		<button
			className={classNames(styles[`custom-button`], {
				[styles[`custom-button_variant_${variant}`]]: variant,
			})}
			type={type}
			onClick={onClick}
		>
			{title}
		</button>
	);
};

export default CustomButton;
