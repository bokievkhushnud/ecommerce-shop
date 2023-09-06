import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Divider,
  Chip,
  Grid,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { getProductByID } from '../commercetools-api/queryAllProducts';
import { IProduct } from '../types';
import ImageModal from '../components/specific/ImageModal';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProductByID(productId as string)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6">Error: {error}</Typography>;
  if (!product) return <Typography variant="h6">Product not found.</Typography>;

  const { name, description, masterVariant } = product.masterData.current;

  const displayPrice = (centAmount: number) =>
    `$${(centAmount * 0.01).toFixed(2)}`;
  const hasDiscount =
    masterVariant.prices[0].discounted &&
    masterVariant.prices[0].discounted.value;

  return (
    <Container>
      <Box mt={3}>
        <Typography variant="h2" component="h1" gutterBottom>
          {name['en-US']}
        </Typography>
        <Divider />

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={5}>
            <ImageModal images={masterVariant.images} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" gutterBottom>
              Description:
            </Typography>
            <Typography variant="body1" paragraph>
              {description['en-US']}
            </Typography>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="start"
              alignItems="center"
              mt={3}
            >
              <Typography variant="h6" gutterBottom>
                Price:
              </Typography>
              {hasDiscount ? (
                <>
                  <Typography
                    variant="h6"
                    color={red[500]}
                    style={{
                      marginLeft: '10px',
                      textDecoration: 'line-through',
                    }}
                  >
                    {displayPrice(masterVariant.prices[0].value.centAmount)}
                  </Typography>
                  <Chip
                    label={`Sale: ${displayPrice(
                      masterVariant.prices[0].discounted.value.centAmount
                    )}`}
                    color="primary"
                    style={{ marginLeft: '10px' }}
                  />
                </>
              ) : (
                <Typography variant="h6" style={{ marginLeft: '10px' }}>
                  {displayPrice(masterVariant.prices[0].value.centAmount)}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Add any additional details here */}
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
