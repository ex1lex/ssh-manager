import styled from 'styled-components';

export const StyledTxtConfigPage = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const StyledTxtConfigPageText = styled.p`
	width: 100%;
	margin: 0;
	box-sizing: border-box;
	white-space: pre-wrap;
	overflow-wrap: anywhere;
	color: ${({ theme }) => theme.colors.text};
	font-style: normal;
	font-size: 16px;
	font-weight: normal;
	line-height: 24px;
`;
export const StyledTxtConfigPageForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const StyledTxtConfigPageContainer = styled.div`
	display: flex;
	gap: 10px;
`;
