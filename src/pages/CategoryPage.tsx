import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICategory } from '../types';
import { getCategoryByID } from '../commercetools-api/queryCategories';
import ProductCard from '../components/common/ProductCard';
import { Container, Typography, Box, Grid } from '@mui/material';
import CategorySidebar from '../components/common/CategorySidebar';
import BreadcrumbNavigation from '../components/common/BreadcrumbNavigation';
import { queryAllProducts } from '../commercetools-api/queryAllProducts';
import { IProduct } from '../types';

function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [productsData, setProductsData] = useState<IProduct[] | null>(null);

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
      queryAllProducts().then((data: IProduct[]) => {
        console.log(data);
        setProductsData(data);
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
                  {productsData && category ? (
                    productsData.map((product, index) => {
                      if (
                        product.masterData.current.categories.length > 0 &&
                        product.masterData.current.categories.some(
                          (categoryofProduct) =>
                            categoryofProduct.id === category.id
                        )
                      ) {
                        return (
                          <Grid item xs={12} sm={3} md={3} key={index}>
                            <ProductCard {...product} />
                          </Grid>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <p>Loading products data...</p>
                  )}
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
