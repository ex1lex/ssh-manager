import styled from 'styled-components';

export const StyledConfigPage = styled.ul`
	box-sizing: border-box;
	width: 100%;
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const StyledConfigPageItem = styled.li``;

export const StyledConfigPageKey = styled.p`
	color: ${({ theme }) => theme.colors.text};
	font-style: normal;
	font-size: 16px;
	font-weight: bold;
	line-height: 24px;
	margin: 0;
	overflow-wrap: break-word;
`;

export const StyledConfigPageValue = styled.span`
	font-weight: normal;
	margin-left: 5px;
	word-break: break-word;
`;
