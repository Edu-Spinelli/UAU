// src/controllers/clientController.js

const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { name, phone, balance } = req.body;
    const client = await Client.create({ name, phone, balance });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { name, phone, balance } = req.body;
    const [updated] = await Client.update(
      { name, phone, balance },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedClient = await Client.findByPk(req.params.id);
      res.json(updatedClient);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deleted = await Client.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
};
