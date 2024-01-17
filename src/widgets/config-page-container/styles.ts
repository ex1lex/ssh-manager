import styled from 'styled-components';

export const StyledConfigPageContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 10px 0 25px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const StyledConfigPageContainerContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	gap: 25px;
	padding: 0 25px;
`;

export const StyledConfigPageContainerTitle = styled.h4`
	color: ${({ theme }) => theme.colors.text};
	font-style: normal;
	font-size: 24px;
	font-weight: 700;
	line-height: 32px;
	margin: 0;
`;

export const StyledConfigPageContainerContent = styled.div`
	max-width: ${({ theme }) => theme.variables.defaultPageContentMaxWidth};
	width: 100%;
`;
