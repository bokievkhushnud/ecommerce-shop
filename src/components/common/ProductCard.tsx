import React from 'react';
import {
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
} from '@mui/material';
import { ProductProps } from '../../types';

const ProductCard: React.FC<ProductProps> = ({
  title,
  image,
  description,
  price,
}) => {
  return (
    <CardActionArea>
      <CardMedia
        image={image}
        title={title}
        style={{ height: 0, paddingTop: '56.25%' }}
      />
      <CardContent>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="subtitle1">${price.toFixed(2)}</Typography>
      </CardContent>
    </CardActionArea>
  );
};

export default ProductCard;
