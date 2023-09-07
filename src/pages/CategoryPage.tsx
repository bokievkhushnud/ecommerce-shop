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
  const [searchTerm, setSearchTerm] = useState<string>(''); // holds the user's search input
  const [searchResults, setSearchResults] = useState<IProduct[] | null>(null); // holds the products returned from the search

  const handleSearchChange = async (term: string) => {
    if (term.trim()) {
      const results = await searchProducts(term);
      setProductsData(results);
    } else {
      setSearchResults(null); // Reset search results if the term is empty
    }
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearchChange(searchTerm);
    }
  }, [searchTerm]);

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

  useEffect(() => {
    queryAllProducts(selectedFilter).then((data) => setProductsData(data));
  }, [selectedFilter]);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);

    let sortOrder = '';
    if (selectedValue === 'Name (A-Z)') {
      sortOrder = 'name.en-US.asc';
    } else if (selectedValue === 'Name (Z-A)') {
      sortOrder = 'name.en-US.desc';
    } else if (selectedValue === 'Price: Low to High') {
      sortOrder = 'price.asc';
    } else if (selectedValue === 'Price: High to Low') {
      sortOrder = 'price.desc';
    } else {
      sortOrder = ''; // for default
    }
    queryAllProducts(sortOrder).then((data) => setProductsData(data));
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
