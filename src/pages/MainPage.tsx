import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import SearchAndFilter from '../components/common/SearchAndFilter';
import DiscountBanner from '../components/common/DiscountBanner';
import ProductCard from '../components/common/ProductCard';
import { queryCategories } from '../commercetools-api/queryCategories';
import CategoryCard from '../components/common/CategoryCard';
import { ICategory } from '../types';
import { useState, useEffect } from 'react';

const MainPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  useEffect(() => {
    queryCategories().then((data: ICategory[]) => {
      console.log(data);
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
  }, []);

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

      <SearchAndFilter />

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {categories ? (
          categories.map((category, index) => {
            if (category.parent === null) {
              return (
                <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                  <CategoryCard key={category.id} category={category} />
                </Grid>
              );
            }
          })
        ) : (
          <div>Loading...</div>
        )}
      </Grid>

      <DiscountBanner />
    </Container>
  );
};

export default MainPage;
