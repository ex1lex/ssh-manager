import { createGlobalStyle } from 'styled-components';

export const Theme = {
	colors: {
		text: 'rgb(31, 41, 55)',
		background: '#e5e7eb',
		primary: 'rgb(79, 70, 229)',
		danger: 'red',
		border: '#d1d5db',
	},
	variables: {
		borderRadius: '4px',
		defaultPageContentMaxWidth: '500px',
		hoverOpacity: '0.6',
	},
};

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: sans-serif !important;
    box-sizing: border-box;
    transition: opacity 0.3s ease, background 0.3s ease;
  }
  body {
    background: ${({ theme }) => theme.colors.background};
    margin: 0;
  }
`;
