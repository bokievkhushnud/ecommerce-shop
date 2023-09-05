import React from 'react';
import {
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
} from '@mui/material';
import { IProduct } from '../../types';

const ProductCard: React.FC<IProduct> = (product) => {
  const productName =
    product.masterData.current.name['en-US'].length < 20
      ? product.masterData.current.name['en-US']
      : product.masterData.current.name['en-US'].slice(0, 20).concat('...');
  const productDescription =
    product.masterData.current.description['en-US'].length < 20
      ? product.masterData.current.description['en-US']
      : product.masterData.current.description['en-US']
          .slice(0, 20)
          .concat('...');

  return (
    <CardActionArea>
      <CardMedia
        image={product.masterData.current.masterVariant.images[0].url}
        title={productName}
        style={{ paddingTop: '100%' }}
      />
      <CardContent style={{ padding: '10px 5px 0' }}>
        <Typography variant="body1">{productName}</Typography>
        <Typography variant="body2">{productDescription}</Typography>
        {product.masterData.current.masterVariant.prices.length ? (
          <div>
            {product.masterData.current.masterVariant.prices[0].discounted &&
            product.masterData.current.masterVariant.prices[0].discounted
              .value &&
            product.masterData.current.masterVariant.prices[0].discounted.value
              .centAmount ? (
              <>
                <Typography
                  variant="body2"
                  style={{ textDecoration: 'line-through', color: 'gray' }}
                >
                  {`$${(
                    product.masterData.current.masterVariant.prices[0].value
                      .centAmount * 0.01
                  ).toFixed(2)}`}
                </Typography>
                <Typography variant="body2" style={{ color: 'red' }}>
                  {`$${(
                    product.masterData.current.masterVariant.prices[0]
                      .discounted.value.centAmount * 0.01
                  ).toFixed(2)}`}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">
                {`$${(
                  product.masterData.current.masterVariant.prices[0].value
                    .centAmount * 0.01
                ).toFixed(2)}`}
              </Typography>
            )}
          </div>
        ) : (
          <Typography variant="body2">$0.00</Typography>
        )}
      </CardContent>
    </CardActionArea>
  );
};

export default ProductCard;
