import React from 'react';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import { ICategory } from '../../types';

interface BreadcrumbNavigationProps {
  breadcrumbs: ICategory;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  breadcrumbs,
}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        MainPage
      </Link>
      {/* <Link
        underline="hover"
        color="inherit"
        href="/material-ui/getting-started/installation/"
      >
        ParentNode
      </Link> */}
      <Typography color="text.primary">{breadcrumbs.name['en-US']}</Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbNavigation;
