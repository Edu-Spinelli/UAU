import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getProductById(id);
        setProduct(result);
      } catch (error) {
        console.error('Erro ao buscar o produto', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <h1>{product.name}</h1>
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      <p><strong>Descrição:</strong> {product.description}</p>
      <p><strong>Preço:</strong> {product.price}</p>
      <p><strong>Categoria:</strong> {product.Category ? product.Category.name : 'Categoria não disponível'}</p>
      <p><strong>Quantidade:</strong> {product.quantity}</p>
    </div>
  );
};

export default ProductDetail;
