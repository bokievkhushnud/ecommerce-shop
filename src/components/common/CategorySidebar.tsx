import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Typography,
  Collapse,
  Icon,
} from '@mui/material';
import { ICategory } from '../../types';
import { queryCategories } from '../../commercetools-api/queryCategories';

interface CategorySidebarProps {
  onSelectCategory: ICategory;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  onSelectCategory,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    queryCategories().then((data: ICategory[]) => {
      setCategories(data);
    });
  }, []);

  const renderCategory = (category: ICategory) => {
    const hasChildren =
      category.parent && category.parent.typeId === 'category';

    return (
      <div key={category.id}>
        {!hasChildren && (
          <ListItemButton
            component={RouterLink}
            to={`/categories/${category.id}`}
            selected={category.id === onSelectCategory.id}
          >
            <ListItemText primary={category.name['en-US']} />
          </ListItemButton>
        )}
      </div>
    );
  };

  return (
    <div className="category-sidebar">
      <List component="nav">
        {categories.map((category) => renderCategory(category))}
      </List>
    </div>
  );
};

export default CategorySidebar;
