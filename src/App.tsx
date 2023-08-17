import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registration';
import theme from './theme';
import MainPage from './pages/Main';
import MainLayout from './components/layouts/MainLayout';

let router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/registration', element: <RegistrationPage /> },
  {
    path: '/',
    element: (
      <MainLayout>
        <MainPage />
      </MainLayout>
    ),
  },
]);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
