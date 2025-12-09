import React from 'react';
import {
  ChakraProvider,
  extendTheme,
  ColorModeScript,
  Box
} from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './router/AppRoutes';
import { HospitalDataProvider } from './context/HospitalDataContext';
import ErrorBoundary from './components/ErrorBoundary';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import HospitalAIChatbot from './components/HospitalAIChatbot';
import { NavigationHistoryProvider } from './components/BreadcrumbNavigator';
import theme from './theme';

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <ErrorBoundary>
          <HospitalDataProvider>
            <NotificationProvider>
              <AuthProvider>
                <Router>
                  <NavigationHistoryProvider>
                    <AppRoutes />
                    <HospitalAIChatbot />
                  </NavigationHistoryProvider>
                </Router>
              </AuthProvider>
            </NotificationProvider>
          </HospitalDataProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </>
  );
}

export default App;