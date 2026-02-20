/**
 * App root — ApolloProvider, ThemeProvider, Router.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { apolloClient } from './apollo/client';
import { appTheme } from './theme/theme';
import { SearchPage } from './pages/SearchPage';
import { ForecastPage } from './pages/ForecastPage';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/forecast" element={<ForecastPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
