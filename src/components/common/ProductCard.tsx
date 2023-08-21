import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import { ProductProps } from '../../types';

const ProductCard: React.FC<ProductProps> = ({
  title,
  image,
  description,
  price,
}) => {
  return (
    <Card>
      <CardMedia
        image={image}
        title={title}
        style={{ height: 0, paddingTop: '56.25%' }}
      />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1">${price.toFixed(2)}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <Button size="small" color="primary">
        View Details
      </Button>
    </Card>
  );
};

export default ProductCard;
