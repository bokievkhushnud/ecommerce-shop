import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const MainPage: React.FC = () => {
    return (
        <Container>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                marginY={4}
            >
                <Typography variant="h3" gutterBottom>
                    Welcome to Grandma's Shop
                </Typography>
                <Typography variant="h5" paragraph>
                    We'll remind you of your grandma's cooking.
                </Typography>
            </Box>
        </Container>
    );
};

export default MainPage;
