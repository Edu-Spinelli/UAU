import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Carregando...</p>; // Exibe carregando enquanto o produto é buscado
  }

  return (
    <div>
      <h1>{product.name}</h1>
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      <p><strong>Descrição:</strong> {product.description}</p>
      <p><strong>Preço:</strong> {product.price}</p>
      <p><strong>Categoria:</strong> {product.Category ? product.Category.name : 'Sem Categoria'}</p>
      <p><strong>Quantidade:</strong> {product.quantity}</p>
    </div>
  );
};

export default ProductDetail;
