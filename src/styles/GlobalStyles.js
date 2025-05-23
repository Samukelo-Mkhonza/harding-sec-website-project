// styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.darkGray};
    background-color: ${props => props.theme.colors.white};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.fontWeights.bold};
    line-height: 1.2;
    color: ${props => props.theme.colors.black};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: ${props => props.theme.transitions.fast};
  }

  button {
    font-family: ${props => props.theme.fonts.primary};
    cursor: pointer;
    border: none;
    outline: none;
    transition: ${props => props.theme.transitions.normal};
  }

  input, textarea, select {
    font-family: ${props => props.theme.fonts.primary};
    outline: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.lightGray};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primaryGreen};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.black};
  }

  /* Selection color */
  ::selection {
    background: ${props => props.theme.colors.primaryGreen};
    color: ${props => props.theme.colors.white};
  }

  ::-moz-selection {
    background: ${props => props.theme.colors.primaryGreen};
    color: ${props => props.theme.colors.white};
  }

  /* Utility classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    body {
      font-size: ${props => props.theme.fontSizes.sm};
    }
  }
`;