// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct, updateProduct } from '../services/productService';

const ProductCard = ({ product, onDelete, onUpdate }) => {
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

  const handleIncrease = async () => {
    try {
      const updatedProduct = { ...product, quantity: product.quantity + 1 };
      await updateProduct(product.id, updatedProduct);
      onUpdate(updatedProduct);
    } catch (error) {
      console.error('Erro ao aumentar a quantidade do produto', error);
    }
  };

  const handleDecrease = async () => {
    if (product.quantity > 0) {
      try {
        const updatedProduct = { ...product, quantity: product.quantity - 1 };
        await updateProduct(product.id, updatedProduct);
        onUpdate(updatedProduct);
      } catch (error) {
        console.error('Erro ao diminuir a quantidade do produto', error);
      }
    }
  };

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      <p>{product.description}</p>
      <p><strong>Preço:</strong> {product.price}</p>
      <p><strong>Categoria:</strong> {product.Category ? product.Category.name : 'Categoria não disponível'}</p>
      <p><strong>Quantidade:</strong> {product.quantity}</p>
      <div>
        <button onClick={handleDecrease}>-</button>
        <button onClick={handleIncrease}>+</button>
      </div>
      <Link to={`/product/${product.id}`}>View Details</Link> |{' '}
      <Link to={`/edit/${product.id}`}>Edit</Link> |{' '}
      <a href="#" onClick={handleDelete}>Delete</a>
    </div>
  );
};

export default ProductCard;
