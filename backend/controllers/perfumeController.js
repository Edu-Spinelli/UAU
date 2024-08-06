// controllers/perfumeController.js

const Perfume = require('../models/Perfume');

// Obter todos os perfumes
exports.getAllPerfumes = async (req, res) => {
  try {
    const perfumes = await Perfume.findAll();
    res.json(perfumes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfumes' });
  }
};

// Obter um perfume por ID
exports.getPerfumeById = async (req, res) => {
  try {
    const perfume = await Perfume.findByPk(req.params.id);
    if (perfume) {
      res.json(perfume);
    } else {
      res.status(404).json({ error: 'Perfume não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfume' });
  }
};

// Criar um novo perfume
exports.createPerfume = async (req, res) => {
  try {
    const perfume = await Perfume.create(req.body);
    res.status(201).json(perfume);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar perfume' });
  }
};

// Atualizar um perfume existente
exports.updatePerfume = async (req, res) => {
  try {
    const [updated] = await Perfume.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPerfume = await Perfume.findByPk(req.params.id);
      res.status(200).json(updatedPerfume);
    } else {
      res.status(404).json({ error: 'Perfume não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfume' });
  }
};

// Deletar um perfume
exports.deletePerfume = async (req, res) => {
  try {
    const deleted = await Perfume.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Perfume não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar perfume' });
  }
};
