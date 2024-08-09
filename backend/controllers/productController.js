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
        num: 10 // Buscar até 10 imagens para validação
      }
    });

    const items = response.data.items;
    if (items && items.length > 0) {
      // Tentar encontrar uma imagem do site da Natura
      const naturaImage = items.find(item => item.link.includes('natura'));
      if (naturaImage && await isImageLoadable(naturaImage.link)) {
        return naturaImage.link;
      }
      
      // Se não encontrar imagem do site da Natura, retornar a primeira imagem válida
      for (let item of items) {
        if (await isImageLoadable(item.link)) {
          return item.link;
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar imagem do produto:', error);
    return null;
  }
}

// Função para verificar se a imagem é carregável
async function isImageLoadable(url) {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch {
    return false;
  }
}

// Obter todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const whereClause = categoryId ? { categoryId } : {};

    const products = await Product.findAll({
      where: whereClause,
      include: Category,
    });

    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
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
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// Criar um novo produto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, quantity } = req.body;
    const imageUrl = await fetchProductImage("Natura " + name);

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

    const updatedProduct = await Product.findByPk(req.params.id, { include: Category });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
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
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};
