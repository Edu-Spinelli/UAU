import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductList = ({ products, setProducts }) => {

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
      <Link to="/edit/new" className="add-product-card-link">
        <div className="product-card add-product-card">
          <button className="add-product-button">+</button>
        </div>
      </Link>
    </div>
  );
};

export default ProductList;
