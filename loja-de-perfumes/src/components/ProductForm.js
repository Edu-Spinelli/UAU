// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../services/productService';
import { getCategories } from '../services/categoryService';

const ProductForm = ({ product, isEditing }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [categoryId, setCategoryId] = useState(product ? product.categoryId : '');
  const [quantity, setQuantity] = useState(product ? product.quantity : 0);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };

    fetchCategories();

    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategoryId(product.categoryId);
      setQuantity(product.quantity);
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = { name, description, price, categoryId, quantity };

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
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Selecione uma categoria</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Quantidade</label>
        <div>
          <button type="button" onClick={() => setQuantity(quantity - 1)}>-</button>
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} />
          <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProductForm;
