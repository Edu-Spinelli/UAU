// src/pages/Home.js

import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { getPerfumes } from '../services/perfumeService';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPerfumes();
      setProducts(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista de Perfumes</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
