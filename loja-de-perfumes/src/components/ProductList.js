// src/components/ProductList.js

import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, setProducts }) => {
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onDelete={handleDelete} 
          onUpdate={handleUpdate} 
        />
      ))}
    </div>
  );
};

export default ProductList;
