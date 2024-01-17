import styled from 'styled-components';

export const StyledCustomButton = styled.button<{
	$variant: 'outline' | 'fill' | 'simple';
	$color: 'primary' | 'danger' | 'currentColor';
}>`
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 16px;
	box-sizing: border-box;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	border-radius: ${({ theme }) => theme.variables.borderRadius};
	width: auto;
	${({ theme, $variant, $color }) => {
		const color = $color === 'currentColor' ? $color : theme.colors[$color];

		switch ($variant) {
			case 'simple':
				return `
					padding: 0;
					margin: 0;
					background: none;
					color: ${color};

					&:hover {
						opacity: ${theme.variables.hoverOpacity};
					}
				`;
				break;

			case 'fill':
				return `
						padding: 5px 10px;
						margin: 0;
						background: ${color};
						color: white;
	
						&:hover {
							opacity: ${theme.variables.hoverOpacity}
						}
					`;
				break;

			case 'outline':
				return `
							padding: 5px 10px;
							margin: 0;
							background: none;
							border: 1px solid ${color};
							color: ${color};
		
							&:hover {
								opacity: ${theme.variables.hoverOpacity}
							}
						`;
				break;

			default:
				break;
		}
	}}
`;
