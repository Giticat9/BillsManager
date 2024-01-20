import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
    }
    
    body {
        position: relative;
        width: 100%;
        height: 100vh;

        & > .app {
            position: relative;
            display: grid;
            grid-template-rows: 1fr auto;
            width: 100%;
            height: 100%;
        }
    }
`;
