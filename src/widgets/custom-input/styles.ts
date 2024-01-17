import styled from 'styled-components';

export const StyledCustomInput = styled.div``;

export const StyledCustomInputLabel = styled.label`
	box-sizing: border-box;
	display: block;
	margin: 0 0 5px;
	color: ${({ theme }) => theme.colors.text};
	font-style: normal;
	font-size: 14px;
	font-weight: normal;
	line-height: 16px;
`;

export const StyledCustomInputInput = styled.input`
	box-sizing: border-box;
	width: 100%;
	resize: vertical;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.variables.borderRadius};
`;

export const StyledCustomInputTextarea = styled.textarea`
	box-sizing: border-box;
	width: 100%;
	resize: vertical;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.variables.borderRadius};
`;

export const StyledCustomInputError = styled.p`
	margin: 0;
	color: red;
	font-style: normal;
	font-size: 12px;
	font-weight: normal;
	line-height: 14px;
`;
