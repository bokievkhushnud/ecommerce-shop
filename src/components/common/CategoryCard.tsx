import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ICategory } from '../../types';
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
} from '@mui/material';

interface CategoryCardProps {
  category: ICategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const imageUrl = `./${category.slug['en-US']}.jpg`;

  return (
    <Card
      style={{
        maxWidth: 300,
        margin: 'auto',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform .2s',
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/categories/${category.id}`}
        style={{ textDecoration: 'none' }}
      >
        <CardMedia
          style={{
            height: 260,
            backgroundPosition: 'center',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          image={imageUrl}
          title={category.name['en-US']}
        />
        <CardContent>
          <Typography variant="h6" component="div" align="center">
            {category.name['en-US']}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
