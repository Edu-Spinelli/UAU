// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../services/productService';

const ProductCard = ({ product, onDelete }) => {
  const handleDelete = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm(`Tem certeza que deseja deletar o produto "${product.name}"?`);
    if (isConfirmed) {
      try {
        await deleteProduct(product.id);
        onDelete(product.id);
      } catch (error) {
        console.error('Erro ao deletar o produto', error);
      }
    }
  };

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Preço:</strong> {product.price}</p>
      <p><strong>Categoria:</strong> {product.category}</p>
      <Link to={`/product/${product.id}`}>View Details</Link> |{' '}
      <Link to={`/edit/${product.id}`}>Edit</Link> |{' '}
      <a href="#" onClick={handleDelete}>Delete</a>
    </div>
  );
};

export default ProductCard;
