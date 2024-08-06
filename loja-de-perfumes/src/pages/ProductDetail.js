// src/pages/ProductDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductById(id);
      setProduct(result);
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Preço:</strong> {product.price}</p>
      <p><strong>Categoria:</strong> {product.category}</p>
    </div>
  );
};

export default ProductDetail;
