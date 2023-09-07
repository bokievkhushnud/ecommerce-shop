import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  SelectChangeEvent,
} from '@mui/material';

import { ICategory, IProduct } from '../types';
import { getCategoryByID } from '../commercetools-api/queryCategories';
import { queryAllProducts } from '../commercetools-api/queryAllProducts';

import ProductCard from '../components/common/ProductCard';
import CategorySidebar from '../components/common/CategorySidebar';
import BreadcrumbNavigation from '../components/common/BreadcrumbNavigation';
import SearchAndFilter from '../components/common/SearchAndFilter';

function CategoryPage() {
  const { id } = useParams<{ id?: string }>();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [productsData, setProductsData] = useState<IProduct[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('');

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

  const sortProductsByName = () => {
    if (productsData) {
      console.log(productsData);
      const sortedProducts = [...productsData].sort((a, b) =>
        a.masterData.current.name['en-US'].localeCompare(
          b.masterData.current.name['en-US']
        )
      );
      setProductsData(sortedProducts);
    }
  };

  const sortProductsByPrice = (boolean: boolean) => {
    if (productsData) {
      const sortedProducts = [...productsData].sort((a, b) => {
        const priceA =
          a.masterData.current.masterVariant.prices[0].discounted &&
          a.masterData.current.masterVariant.prices[0].discounted.value
            ? a.masterData.current.masterVariant.prices[0].discounted.value
                .centAmount
            : a.masterData.current.masterVariant.prices[0].value.centAmount;
        const priceB =
          b.masterData.current.masterVariant.prices[0].discounted &&
          b.masterData.current.masterVariant.prices[0].discounted.value
            ? b.masterData.current.masterVariant.prices[0].discounted.value
                .centAmount
            : b.masterData.current.masterVariant.prices[0].value.centAmount;

        return boolean ? priceA - priceB : priceB - priceA;
      });
      setProductsData(sortedProducts);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);

    if (selectedValue === 'Name') {
      sortProductsByName();
    } else if (selectedValue === 'Price: Low to High') {
      sortProductsByPrice(true);
    } else if (selectedValue === 'Price: High to Low') {
      sortProductsByPrice(false);
    }
  };

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
                <SearchAndFilter
                  selectedFilter={selectedFilter}
                  onFilterChange={handleFilterChange}
                />
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
