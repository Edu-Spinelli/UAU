// src/components/ProductList.js

import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, setProducts }) => {
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ProductList;
