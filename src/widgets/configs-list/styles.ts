import CustomButton from '@widgets/custom-button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledConfigList = styled.div``;

export const StyledConfigListList = styled.ul`
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	list-style: none;
	gap: 2px;
`;

export const StyledCustomButton = styled(CustomButton)``;

export const StyledConfigListItem = styled.li`
	padding: 0 2px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 30px;
	color: ${({ theme }) => theme.colors.text};

	&:hover {
		${StyledCustomButton} {
			display: block;
		}
	}

	${StyledCustomButton} {
		display: none;
	}
`;

export const StyledConfigListLink = styled(Link)`
	display: block;
	color: ${({ theme }) => theme.colors.text};
	text-decoration: none;
	text-align: left;
	padding: 0;
	border: none;
	cursor: pointer;
	background: none;
	max-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	&:hover {
		opacity: ${({ theme }) => theme.variables.hoverOpacity};
	}
`;

export const StyledConfigListActions = styled.div`
	display: flex;
	gap: 2px;
`;
