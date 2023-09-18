import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Typography,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import { ExpandMore, ChevronRight } from '@mui/icons-material';
import { ICategory } from '../../types';
import { queryCategories } from '../../commercetools-api/queryCategories';

interface CategorySidebarProps {
  onSelectCategory: ICategory;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  onSelectCategory,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>(
    onSelectCategory.id || 'all'
  );

  useEffect(() => {
    queryCategories().then((data: ICategory[]) => {
      setCategories(data);
    });
  }, []);
  const location = useLocation();

  const handleClick = (id: string) => {
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  };

  const renderCategory = (category: ICategory) => {
    const isParent = categories.some(
      (child) => child.parent?.id === category.id
    );

    return (
      <Box key={category.id}>
        <ListItemButton
          component={RouterLink}
          to={`/categories/${category.id}`}
          selected={category.id === onSelectCategory.id}
          onClick={() => handleClick(category.id)}
          sx={{ borderRadius: '5px', mb: 1, px: 1 }}
        >
          <ListItemIcon>
            {isParent ? (
              open === category.id ? (
                <ExpandMore />
              ) : (
                <ChevronRight />
              )
            ) : null}
          </ListItemIcon>
          <ListItemText primary={category.name['en-US']} />
        </ListItemButton>

        {isParent && (
          <Collapse in={open === category.id} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories
                .filter((child) => child.parent?.id === category.id)
                .map((child) => (
                  <ListItemButton
                    key={child.id}
                    component={RouterLink}
                    to={`/categories/${child.id}`}
                    selected={child.id === onSelectCategory.id}
                    sx={{ pl: 4, borderRadius: '5px', mb: 0.5 }}
                  >
                    <ListItemText primary={child.name['en-US']} />
                  </ListItemButton>
                ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Paper elevation={2} sx={{ mt: 2, p: 2, bgcolor: 'background.default' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Categories
      </Typography>
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        sx={{ mt: 2 }}
      >
        <ListItemButton
          component={RouterLink}
          to="/categories"
          selected={location.pathname === '/categories'}
          sx={{ borderRadius: '5px', mb: 1, px: 1 }}
        >
          <ListItemText primary="All Categories" />
        </ListItemButton>
        <Divider />
        {categories
          .filter((cat) => !cat.parent)
          .map((category) => renderCategory(category))}
      </List>
    </Paper>
  );
};

export default CategorySidebar;
