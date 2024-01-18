import React, { FC } from 'react';

import { StyledCustomButton } from './styles';

interface Props {
	children: string | React.ReactElement;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'outline' | 'fill' | 'simple';
	color?: 'primary' | 'danger' | 'currentColor';
	className?: string;
}

const CustomButton: FC<Props> = ({
	children,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onClick = () => {},
	type = 'button',
	variant = 'fill',
	color = 'primary',
	className,
}) => {
	return (
		<StyledCustomButton
			type={type}
			onClick={onClick}
			className={className}
			$color={color}
			$variant={variant}
		>
			{children}
		</StyledCustomButton>
	);
};

export default CustomButton;
