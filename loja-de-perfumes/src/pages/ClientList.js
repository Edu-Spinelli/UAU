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

  const handleDelete = async (id, name) => {
    const isConfirmed = window.confirm(`Tem certeza que deseja remover o cliente "${name}"?`);
    if (isConfirmed) {
      try {
        await deleteClient(id);
        setClients(clients.filter((client) => client.id !== id));
      } catch (error) {
        console.error('Erro ao deletar o cliente', error);
      }
    }
  };

  return (
    <div>
      <h1>Clientes</h1>
      <table className="client-table">
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
              <td>{client.balance ? parseFloat(client.balance).toFixed(2) : '0.00'}</td>
              <td className="actions">
                <Link to={`/clients/edit/${client.id}`}>
                  <button className="btn">Editar</button>
                </Link>
                <button className="btn" onClick={() => handleDelete(client.id, client.name)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-client-button-container">
        <Link to="/clients/edit/new" className="add-client-button">
          <button className="btn add-btn">Adicionar Cliente</button>
        </Link>
      </div>
    </div>
  );
};

export default ClientList;
