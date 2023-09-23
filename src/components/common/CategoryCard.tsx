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
        maxWidth: 280,
        margin: 'auto',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform .2s',
        position: 'relative',
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/categories/${category.id}`}
        style={{ textDecoration: 'none' }}
      >
        <CardMedia
          style={{
            height: 290,
            backgroundPosition: 'center bottom',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            position: 'relative',
          }}
          image={imageUrl}
          title={category.name['en-US']}
        />
        <CardContent
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '8px',
            fontWeight: '600',
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            style={{
              fontWeight: '600',
              color: '#848482',
            }}
          >
            {category.name['en-US']}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
