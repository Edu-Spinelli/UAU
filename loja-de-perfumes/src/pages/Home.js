import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { getProducts } from '../services/productService';

const Home = () => {
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
      const filtered = await getProducts({ categoryId });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <CategoryFilter onCategoryChange={handleCategoryChange} />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
