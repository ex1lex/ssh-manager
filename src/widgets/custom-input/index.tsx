import React, { FC, useCallback, useId } from 'react';

import {
	StyledCustomInput,
	StyledCustomInputError,
	StyledCustomInputInput,
	StyledCustomInputLabel,
	StyledCustomInputTextarea,
} from './styles';

interface Props {
	label?: string;
	errorMessage?: string;
	rows?: number;
	variant?: 'input' | 'textarea';
	formProps?: Record<string, any>;
}

const CustomInput: FC<Props> = ({
	label,
	variant = 'input',
	errorMessage,
	formProps,
	rows,
}) => {
	const id = useId();

	const Component = useCallback(() => {
		const _props: Record<string, any> = {
			...formProps,
			id,
		};
		switch (variant) {
			case 'textarea':
				_props['rows'] = rows;
				return <StyledCustomInputTextarea {..._props} />;
			case 'input':
			default:
				return <StyledCustomInputInput {..._props} />;
		}
	}, [variant]);

	return (
		<StyledCustomInput>
			{label && (
				<StyledCustomInputLabel htmlFor={id}>{label}</StyledCustomInputLabel>
			)}
			<Component />
			{errorMessage && (
				<StyledCustomInputError role="alert">
					{errorMessage}
				</StyledCustomInputError>
			)}
		</StyledCustomInput>
	);
};

export default CustomInput;
