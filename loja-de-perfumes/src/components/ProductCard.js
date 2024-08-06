// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <Link to={`/product/${product.id}`}>View Details</Link>
    <Link to={`/edit/${product.id}`}>Edit</Link>
  </div>
);

export default ProductCard;
