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
        onDelete(product.id);  // Chama a função onDelete passada como prop
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
    if (product.quantity > 1) {
      try {
        const updatedProduct = { ...product, quantity: product.quantity - 1 };
        await updateProduct(product.id, updatedProduct);
        onUpdate(updatedProduct);
      } catch (error) {
        console.error('Erro ao diminuir a quantidade do produto', error);
      }
    } else {
      const isConfirmed = window.confirm(`A quantidade está em 1. Deseja remover o produto "${product.name}"?`);
      if (isConfirmed) {
        try {
          await deleteProduct(product.id);
          onDelete(product.id);  // Chama a função onDelete passada como prop
        } catch (error) {
          console.error('Erro ao deletar o produto', error);
        }
      }
    }
  };

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      <p className="description">{product.description}</p>
      <p><strong>Preço:</strong> {product.price}</p>
      <p><strong>Categoria:</strong> {product.Category ? product.Category.name : 'Categoria não disponível'}</p>
      <p><strong>Quantidade:</strong> </p>
      <div className="quantity-controls">
        <button onClick={handleDecrease}>-</button>
        <input value={product.quantity} readOnly />
        <button onClick={handleIncrease}>+</button>
      </div>
      <div className="button-group">
        <Link className="btn" to={`/product/${product.id}`}>View Details</Link>
        <Link className="btn" to={`/product/edit/${product.id}`}>Edit</Link>
        <a className="btn" href="#" onClick={handleDelete}>Delete</a>
      </div>
    </div>
  );
};

export default ProductCard;
