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
import {
  queryAllProducts,
  searchProducts,
} from '../commercetools-api/queryAllProducts';

import ProductCard from '../components/common/ProductCard';
import CategorySidebar from '../components/common/CategorySidebar';
import BreadcrumbNavigation from '../components/common/BreadcrumbNavigation';
import SearchAndFilter from '../components/common/SearchAndFilter';

function CategoryPage() {
  const { id } = useParams<{ id?: string }>();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [productsData, setProductsData] = useState<IProduct[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('Default');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchProducts = async () => {
    let sortOrder = '';
    if (selectedFilter === 'Name (A-Z)') {
      sortOrder = 'name.en-US.asc';
    } else if (selectedFilter === 'Name (Z-A)') {
      sortOrder = 'name.en-US.desc';
    } else if (selectedFilter === 'Price: Low to High') {
      sortOrder = 'price.asc';
    } else if (selectedFilter === 'Price: High to Low') {
      sortOrder = 'price.desc';
    }

    if (searchTerm) {
      const results = await searchProducts(searchTerm);
      setProductsData(results);
    } else {
      const data = await queryAllProducts(sortOrder);
      setProductsData(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedFilter]);

  const defaultCategory: ICategory = {
    id: 'istdef',
    name: { 'en-US': 'All Categories' },
    slug: { 'en-US': '' },
    parent: null,
  };

  useEffect(() => {
    if (id) {
      getCategoryByID(id).then((data) => setCategory(data));
    }
  }, [id]);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setSelectedFilter(event.target.value);
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
            <SearchAndFilter
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

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
                  if (
                    !id ||
                    product.categories.some(
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
