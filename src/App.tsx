import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import MainLayout from './components/layouts/MainLayout';
import NotFound from './pages/NotFound';
import theme from './theme/theme';
import MainPage from './pages/MainPage';

let router = createBrowserRouter([
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
