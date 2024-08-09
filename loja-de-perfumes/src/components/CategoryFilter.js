import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/categoryService';

const CategoryFilter = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-filter">
      <select onChange={(e) => onCategoryChange(e.target.value)} defaultValue="">
        <option value="">Todas as Categorias</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
