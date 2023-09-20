import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Avatar,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { queryCategories } from '../commercetools-api/queryCategories';
import CategoryCard from '../components/common/CategoryCard';
import { ICategory } from '../types';
import { fetchPromoCodes } from '../commercetools-api/fetchPromoCodes';

const MainPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);

  useEffect(() => {
    queryCategories().then((data: ICategory[]) => {
      setCategories(
        data.map((category) => ({
          id: category.id,
          name: {
            'en-US': category.name['en-US'],
          },
          slug: {
            'en-US': category.slug['en-US'],
          },
          parent: category.parent
            ? { typeId: category.parent.typeId, id: category.parent.id }
            : null,
        }))
      );
    });
    fetchPromoCodes().then((codes) => {
      setPromoCodes(codes);
    });
  }, []);

  return (
    <Container>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Welcome to Grandma's Shop
        </Typography>
        <Typography variant="h6" paragraph>
          We'll remind you of your grandma's cooking.
        </Typography>
        {promoCodes.map((code) => (
          <Box mt={4} mb={4} width="100%" key={code.id}>
            <Card elevation={5} style={{ backgroundColor: '#ffeb3b' }}>
              {/* Chose a vibrant yellow for attention */}
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: 'bold' }}
                >
                  {code.name['en-US']}
                </Typography>
                <Typography variant="body1">
                  {code.description['en-US']}
                </Typography>
                <Box mt={2}>
                  <Chip
                    label={`Use promocode: ${code.code}`}
                    color="primary"
                    avatar={
                      <Avatar>
                        <LocalOfferIcon />
                      </Avatar>
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
        <Grid container spacing={3}>
          {categories ? (
            categories.map((category, index) => {
              if (category.parent === null) {
                return (
                  <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                    <CategoryCard key={category.id} category={category} />
                  </Grid>
                );
              }
              return null;
            })
          ) : (
            <Box mt={4}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default MainPage;
