import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ICategory } from '../../types';

interface CategoryCardProps {
  category: ICategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  console.log(category);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [categorySlug, setCategorySlug] = useState<string | null>(null);

  useEffect(() => {
    setCategoryId(category.id);
    setCategoryName(category.name['en-US']);
    setCategorySlug(category.slug['en-US']);
  }, [category.id, category.name['en-US'], category.slug['en-US']]);

  return (
    <Link to={`/categories/${categoryId}`} className="category-card-link">
      <div
        className="category-card"
        id={categorySlug || undefined}
        style={{
          backgroundImage: `url(./${category.slug['en-US']}.jpg)`,
          width: '250px',
          height: '350px',
          backgroundSize: 'cover',
        }}
      >
        <div className="category-card-title">
          {categoryName || 'Loading...'}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
