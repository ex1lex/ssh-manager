import React, { FC } from 'react';
import { Button } from 'reactstrap';

interface Props {
	title: string | React.ReactElement;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	color?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'link';
	outline?: boolean;
	size?: 'sm' | 'lg';
	className?: string;
}

const CustomButton: FC<Props> = ({
	title,
	onClick,
	type = 'button',
	color = 'primary',
	outline = false,
	size = 'sm',
	className,
}) => {
	return (
		<Button
			size={size}
			type={type}
			onClick={onClick}
			color={color}
			outline={outline}
			className={className}
		>
			{title}
		</Button>
	);
};

export default CustomButton;
