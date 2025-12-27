import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const GlobalStyles = () => (
    <MuiGlobalStyles
        styles={{
            '*': {
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
            },
            html: {
                scrollBehavior: 'smooth',
            },
            body: {
                margin: 0,
                fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                overflowX: 'hidden',
            },
            '::-webkit-scrollbar': {
                width: '10px',
            },
            '::-webkit-scrollbar-track': {
                background: '#0f172a',
            },
            '::-webkit-scrollbar-thumb': {
                background: '#6366f1',
                borderRadius: '5px',
            },
            '::-webkit-scrollbar-thumb:hover': {
                background: '#4f46e5',
            },
        }}
    />
);

export default GlobalStyles;
