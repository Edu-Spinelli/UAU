// src/pages/ProductEdit.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { getPerfumeById } from '../services/perfumeService';

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const isEditing = id !== 'new';

  useEffect(() => {
    if (isEditing) {
      const fetchData = async () => {
        const result = await getPerfumeById(id);
        setProduct(result);
      };

      fetchData();
    }
  }, [id, isEditing]);

  return (
    <div>
      <h1>{isEditing ? 'Edit Product' : 'Add Product'}</h1>
      <ProductForm product={product} isEditing={isEditing} />
    </div>
  );
};

export default ProductEdit;
