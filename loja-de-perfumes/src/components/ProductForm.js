// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../services/productService';

const ProductForm = ({ product, isEditing }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [category, setCategory] = useState(product ? product.category : '');
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = { name, description, price, category };

    try {
      if (isEditing) {
        await updateProduct(product.id, productData);
      } else {
        await createProduct(productData);
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar o produto', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Descrição</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Preço</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Categoria</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProductForm;
