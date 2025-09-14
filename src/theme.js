import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a2b4e',
    },
    secondary: {
      main: '#26a69a',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

export default darkTheme;


