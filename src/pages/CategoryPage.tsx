import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';

import { ICategory, IProduct } from '../types';
import { getCategoryByID } from '../commercetools-api/queryCategories';
import { queryAllProducts } from '../commercetools-api/queryAllProducts';

import ProductCard from '../components/common/ProductCard';
import CategorySidebar from '../components/common/CategorySidebar';
import BreadcrumbNavigation from '../components/common/BreadcrumbNavigation';

function CategoryPage() {
  const { id } = useParams<{ id?: string }>(); // Made id optional
  const [category, setCategory] = useState<ICategory | null>(null);
  const [productsData, setProductsData] = useState<IProduct[] | null>(null);

  const defaultCategory: ICategory = {
    id: '',
    name: { 'en-US': 'All Categories' },
    slug: { 'en-US': '' },
    parent: null,
  };

  useEffect(() => {
    if (id) {
      getCategoryByID(id).then((data) => setCategory(data));
    }
    queryAllProducts().then((data) => setProductsData(data));
  }, [id]);

  return (
    <Container>
      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} style={{ minHeight: '80vh', padding: '16px' }}>
              <CategorySidebar onSelectCategory={category || defaultCategory} />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={8}>
            {category ? (
              <>
                <BreadcrumbNavigation breadcrumbs={category} />
                <Typography variant="h4" gutterBottom>
                  {category.name['en-US']}
                </Typography>
              </>
            ) : (
              <Typography variant="h4" gutterBottom>
                All Categories
              </Typography>
            )}

            <Grid container spacing={3}>
              {productsData ? (
                productsData.map((product, index) => {
                  // If there's no specific category ID, or if the product belongs to the category, render it
                  if (
                    !id ||
                    product.masterData.current.categories.some(
                      (categoryofProduct) => categoryofProduct.id === id
                    )
                  ) {
                    return (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <ProductCard {...product} />
                      </Grid>
                    );
                  }
                  return null;
                })
              ) : (
                <Typography>Loading products data...</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CategoryPage;
