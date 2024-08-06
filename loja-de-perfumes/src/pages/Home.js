// src/pages/Home.js

import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { getProducts } from '../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ProductList products={products} setProducts={setProducts} />
    </div>
  );
};

export default Home;
