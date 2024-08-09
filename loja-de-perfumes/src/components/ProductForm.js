import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../services/productService';
import { getCategories } from '../services/categoryService';

const ProductForm = ({ isEditing }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    quantity: 1
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    const fetchProduct = async () => {
      if (isEditing && id) {
        const product = await getProductById(id);
        setProduct(product);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [isEditing, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'quantity' && value <= 0) {
      alert('A quantidade deve ser maior que 0.');
      return;
    }

    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.quantity <= 0) {
      alert('A quantidade deve ser maior que 0.');
      return;
    }

    try {
      if (isEditing) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label>Nome</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Descrição</label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          
        />
      </div>
      <div className="form-group">
        <label>Preço</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Categoria</label>
        <select
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Quantidade</label>
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          required
          min="1"
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProductForm;
