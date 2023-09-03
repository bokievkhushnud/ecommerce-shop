import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICategory } from '../types';
import {
  queryCategories,
  getCategoryByID,
} from '../commercetools-api/queryCategories';
import ProductCard from '../components/common/ProductCard';
import { Container, Typography, Box, Grid } from '@mui/material';
import CategorySidebar from '../components/common/CategorySidebar';
import BreadcrumbNavigation from '../components/common/BreadcrumbNavigation';

//   This data will be fetched from API
const products = [
  {
    title: 'Sample Product 1',
    image: 'https://via.placeholder.com/150',
    description: 'This is a sample product.',
    price: 29.99,
  },
  {
    title: 'Sample Product 1',
    image: 'https://via.placeholder.com/150',
    description: 'This is a sample product.',
    price: 29.99,
  },
  {
    title: 'Sample Product 1',
    image: 'https://via.placeholder.com/150',
    description: 'This is a sample product.',
    price: 29.99,
  },
  {
    title: 'Sample Product 1',
    image: 'https://via.placeholder.com/150',
    description: 'This is a sample product.',
    price: 29.99,
  },
  {
    title: 'Sample Product 1',
    image: 'https://via.placeholder.com/150',
    description: 'This is a sample product.',
    price: 29.99,
  },
  {
    title: 'Sample Product 1',
    image: 'https://via.placeholder.com/150',
    description: 'This is a sample product.',
    price: 29.99,
  },
];

function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    if (id) {
      getCategoryByID(id).then((data: ICategory) => {
        setCategory({
          id: data.id,
          name: {
            'en-US': data.name['en-US'],
          },
          slug: {
            'en-US': data.slug['en-US'],
          },
          parent: data.parent
            ? { typeId: data.parent.typeId, id: data.parent.id }
            : null,
        });
      });
    }
  }, [id]);

  return (
    <Container>
      <div
        className="category-page"
        style={{
          marginTop: '30px',
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={4}
            style={{
              maxWidth: '250px',
              minHeight: '80vh',
              borderRadius: '10px',
              border: '1px solid lightgray',
              paddingTop: '0px',
            }}
          >
            {category ? (
              <CategorySidebar onSelectCategory={category} />
            ) : (
              <p>Loading categories data...</p>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            {category ? (
              <>
                <BreadcrumbNavigation breadcrumbs={category} />
                <Typography variant="h4" gutterBottom>
                  {category.name['en-US']}
                </Typography>
                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                  {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={2} key={index}>
                      <ProductCard {...product} />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <p>Loading category data...</p>
            )}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default CategoryPage;
