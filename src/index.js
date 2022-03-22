import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { StyledEngineProvider, createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
const theme = createTheme({
    breakpoints: {
        values: {
            ...defaultTheme.breakpoints.values,
            mobile: 0,
            tablet: 600,
            netbook: 900,
            laptop: 1240,
            desktop: 1500,
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
