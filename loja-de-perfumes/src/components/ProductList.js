import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct, updateProduct } from '../services/productService';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
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
