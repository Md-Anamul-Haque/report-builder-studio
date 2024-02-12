
/* Core */
import { Provider } from 'react-redux';

/* Instruments */
// import { reduxStore } from '@/lib/redux';
import { CssBaseline } from '@mui/material';
import { red } from '@mui/material/colors';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { reduxStore } from './redux';

export const Providers = (props: React.PropsWithChildren) => {
    const theme = React.useMemo(
        () => createTheme({
            palette: {
                primary: {
                    main: '#556cd6',
                },
                secondary: {
                    main: '#19857b',
                },
                error: {
                    main: red.A400,
                },
            },

        }),
        [],
    );
    return <Provider store={reduxStore}>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
    </Provider >
}