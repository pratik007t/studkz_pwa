import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#c4c4ff',
      main: '#3F51B5'
    },
    secondary: {
      light: '#311b92',
      main: '#311b92',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
    "Nunito", "sans-serif"
    ].join(','),
  }
});