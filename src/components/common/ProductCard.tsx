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
    product.masterData.current.name['en-US'].length < 30
      ? product.masterData.current.name['en-US']
      : product.masterData.current.name['en-US'].slice(0, 30).concat('...');
  return (
    <CardActionArea>
      <CardMedia
        image={product.masterData.current.masterVariant.images[0].url}
        title={productName}
        style={{ paddingTop: '56.25%' }}
      />
      <CardContent>
        <Typography variant="body2">{productName}</Typography>
        {/* <Typography variant="subtitle1">${price.toFixed(2)}</Typography> */}
      </CardContent>
    </CardActionArea>
  );
};

export default ProductCard;
