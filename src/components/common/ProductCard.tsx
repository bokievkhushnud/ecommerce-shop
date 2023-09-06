import React from 'react';
import {
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import { IProduct } from '../../types';
import { Link } from 'react-router-dom';

const ProductCard: React.FC<IProduct> = (product) => {
  console.log(product);
  const { name, description, masterVariant } = product.masterData.current;

  const displayPrice = (centAmount: number) =>
    `$${(centAmount * 0.01).toFixed(2)}`;

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <CardActionArea>
        <CardMedia
          image={masterVariant.images[0].url}
          title={name['en-US']}
          style={{ paddingTop: '100%' }}
        />
        <CardContent>
          <Typography variant="body1" noWrap style={{ width: '90%' }}>
            {name['en-US']}
          </Typography>
          <Typography
            variant="body2"
            noWrap
            style={{ width: '90%', color: 'gray' }}
          >
            {description['en-US']}
          </Typography>
          {masterVariant.prices.length ? (
            <Box mt={1}>
              {masterVariant.prices[0].discounted &&
              masterVariant.prices[0].discounted.value ? (
                <>
                  <Typography
                    variant="body2"
                    style={{
                      textDecoration: 'line-through',
                      display: 'inline-block',
                      marginRight: '8px',
                    }}
                  >
                    {displayPrice(masterVariant.prices[0].value.centAmount)}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: 'red', display: 'inline-block' }}
                  >
                    {displayPrice(
                      masterVariant.prices[0].discounted.value.centAmount
                    )}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2">
                  {displayPrice(masterVariant.prices[0].value.centAmount)}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography variant="body2">$0.00</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Link>
  );
};

export default ProductCard;
