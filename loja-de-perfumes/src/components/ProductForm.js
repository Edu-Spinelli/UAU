// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPerfume, updatePerfume, getPerfumeById } from '../services/perfumeService';

const ProductForm = ({ product, isEditing }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const perfumeData = { name, description };

    try {
      if (isEditing) {
        await updatePerfume(product.id, perfumeData);
      } else {
        await createPerfume(perfumeData);
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar o perfume', error);
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
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProductForm;
