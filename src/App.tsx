/* v8 ignore start */
import { ThemeProvider } from '@emotion/react';
import { RestaurantStoreProvider } from './restaurants/RestaurantContext';
import { RestaurantScreen } from './restaurants/RestaurantScreen';
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4400',
    },
    secondary: {
      main: '#00ff44',
    },
  },
});

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Outside In Vite React</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <RestaurantStoreProvider>
            <RestaurantScreen />
          </RestaurantStoreProvider>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
