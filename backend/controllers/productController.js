// controllers/productController.js

const Product = require('../models/Product');
const Category = require('../models/Category');
const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

// Função para buscar imagem do produto no Google
async function fetchProductImage(productName) {
  try {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        key: GOOGLE_API_KEY,
        cx: SEARCH_ENGINE_ID,
        searchType: 'image',
        q: productName,
        num: 1
      }
    });

    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].link;
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar imagem do produto:', error);
    return null;
  }
}

// Obter todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

// Obter um produto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// Criar um novo produto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, quantity } = req.body;
    const imageUrl = await fetchProductImage("Natura "+name);

    console.log('Dados recebidos no backend:', { name, description, price, categoryId, quantity, imageUrl });

    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
      quantity,
      imageUrl
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// Atualizar um produto existente
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, quantity } = req.body;
    const [updated] = await Product.update(
      { name, description, price, categoryId, quantity },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id, { include: Category });
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

// Deletar um produto
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};
