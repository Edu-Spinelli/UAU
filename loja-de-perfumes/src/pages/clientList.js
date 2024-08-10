// src/pages/ClientList.js

import React, { useState, useEffect } from 'react';
import { getClients, deleteClient } from '../services/clientService';
import { Link } from 'react-router-dom';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const clientList = await getClients();
      setClients(clientList);
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      await deleteClient(id);
      setClients(clients.filter(client => client.id !== id));
    }
  };

  return (
    <div>
      <h1>Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Saldo Devedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.phone}</td>
              <td>{parseFloat(client.balance).toFixed(2)}</td>
              <td>
                <Link to={`/clients/edit/${client.id}`}>Editar</Link> |{' '}
                <button onClick={() => handleDelete(client.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/clients/new">Adicionar Cliente</Link>
    </div>
  );
};

export default ClientList;
