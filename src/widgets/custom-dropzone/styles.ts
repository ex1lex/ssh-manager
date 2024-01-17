import styled from 'styled-components';

export const StyledDropzone = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 5px;
	box-sizing: border-box;
`;

export const StyledDropzoneLabel = styled.p`
	display: block;
	margin: 0;
	color: ${({ theme }) => theme.colors.text};
	font-style: normal;
	font-size: 14px;
	font-weight: normal;
	line-height: 16px;
	box-sizing: border-box;
	text-decoration: underline;
	cursor: pointer;
`;

export const StyledDropzoneContainer = styled.div`
	cursor: pointer;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.variables.borderRadius};
	box-sizing: border-box;
	background: white;
	padding: 10px;
`;

export const StyledDropzoneTitle = styled.p`
	display: block;
	margin: 0;
	color: ${({ theme }) => theme.colors.text};
	font-style: normal;
	font-size: 18px;
	font-weight: normal;
	line-height: 20px;
	box-sizing: border-box;
	text-align: center;
`;

export const StyledDropzoneFileContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: baseline;
	gap: 10px;
`;

export const StyledDropzoneFileName = styled.p`
	display: block;
	margin: 0;
	color: ${({ theme }) => theme.colors.text};
	font-style: normal;
	font-size: 16px;
	font-weight: normal;
	line-height: 18px;
	box-sizing: border-box;
`;
