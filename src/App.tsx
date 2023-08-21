import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import MainLayout from './components/layouts/MainLayout';
import NotFound from './pages/NotFound';
import theme from './theme/theme';
import MainPage from './pages/MainPage';
import Login from './pages/Login';

let router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    ),
  },
  {
    path: '/',
    element: (
      <MainLayout>
        <MainPage />
      </MainLayout>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
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
