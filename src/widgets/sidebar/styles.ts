import styled from 'styled-components';

export const StyledSidebar = styled.div`
	height: 100%;
	min-height: 100vh;
	width: 100%;
	min-width: 200px;
	max-width: 300px;
	padding: 10px 0;
	display: flex;
	flex-direction: column;
	gap: 10px;
	border-right: 1px solid ${({ theme }) => theme.colors.border};
	box-sizing: border-box;
`;

export const StyledSidebarContainer = styled.div`
	padding: 0 10px;
`;
