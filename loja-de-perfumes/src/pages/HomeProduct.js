import React, { useState, useEffect } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import { getProducts } from '../services/productService';

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = async (categoryId) => {
    if (categoryId) {
      const filtered = products.filter((product) => product.categoryId === parseInt(categoryId));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Exibe todos os produtos se nenhuma categoria for selecionada
    }
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <CategoryFilter onCategoryChange={handleCategoryChange} />
      <ProductList products={filteredProducts} setProducts={setFilteredProducts} />
    </div>
  );
};

export default HomeProduct;
