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
import { getCartByCustomerID } from '../commercetools-api/getCartByCustomerID';
import { createCart } from '../commercetools-api/createCart';

import ProductCard from '../components/common/ProductCard';
import CategorySidebar from '../components/common/CategorySidebar';
import BreadcrumbNavigation from '../components/common/BreadcrumbNavigation';
import SearchAndFilter from '../components/common/SearchAndFilter';
import { current } from '@reduxjs/toolkit';

function CategoryPage() {
  const { id } = useParams<{ id?: string }>();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [productsData, setProductsData] = useState<IProduct[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('Default');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [allowfetching, setAllowFetching] = useState<boolean>(true);

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
    if (allowfetching) {
      if (searchTerm) {
        console.log('fetching');
        const results = await searchProducts(searchTerm);
        setProductsData(results);
      } else {
        console.log('category choosen', category);
        console.log('fetching');
        const data = await queryAllProducts(sortOrder, currentPage, category);
        setProductsData(data.results);
        setTotalCount(data.total);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    console.log('new category/search/filter, fetch products', category);
    fetchProducts();
  }, [category, searchTerm, selectedFilter, currentPage]);

  useEffect(() => {
    if (productsData) {
      if (productsData.length === totalCount) {
        console.log('stop fetching');
        setAllowFetching(false);
      }
    }
  }, [productsData, totalCount]);

  const defaultCategory: ICategory = {
    id: 'istdef',
    name: { 'en-US': 'All Categories' },
    slug: { 'en-US': '' },
    parent: null,
  };

  useEffect(() => {
    if (id) {
      getCategoryByID(id).then((data) => setCategory(data));
      setCurrentPage(1);
    } else {
      setCategory(null);
    }
    setAllowFetching(true);
  }, [id]);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setSelectedFilter(event.target.value);
    setCurrentPage(1);
    setAllowFetching(true);
  };
  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      50
    ) {
      console.log('scroll now');
      setCurrentPage((prev) => prev + 1);
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
