import styled from 'styled-components';

export const StyledConfigPageHeader = styled.header`
	box-sizing: border-box;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 30px;
	padding: 0 25px 5px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StyledConfigPageHeaderTitle = styled.p`
	color: ${({ theme }) => theme.colors.text};
	font-style: normal;
	font-size: 24px;
	font-weight: 700;
	line-height: 24px;
	margin: 0;
`;
