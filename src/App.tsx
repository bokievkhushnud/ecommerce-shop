import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/Login';
import theme from './theme/theme';
import MainPage from './pages/MainPage';
import MainLayout from './components/layouts/MainLayout';
import NotFoundPage from './pages/NotFound';
import AboutUs from '../src/pages/AboutUs';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { ToastContainer } from 'react-toastify';
import RegistrationForm from './pages/RegistrationForm';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  let router = createBrowserRouter([
    {
      path: '/login',
      element: isLoggedIn ? (
        <Navigate to="/" replace />
      ) : (
        <MainLayout>
          <LoginPage />
        </MainLayout>
      ),
    },
    {
      path: '/register',
      element: isLoggedIn ? (
        <Navigate to="/" replace />
      ) : (
        <MainLayout>
          <RegistrationForm />
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
      element: <NotFoundPage />,
    },
    {
      path: '/about-us',
      element: (
        <MainLayout>
          <AboutUs />
        </MainLayout>
      ),
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
};

export default App;
