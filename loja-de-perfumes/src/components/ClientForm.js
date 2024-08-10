import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient, updateClient, getClientById } from '../services/clientService';
import './ClientForm.css'; // Importando o arquivo CSS

const ClientForm = ({ isEditing }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [client, setClient] = useState({
    name: '',
    phone: '',
    balance: 0
  });

  useEffect(() => {
    const fetchClient = async () => {
      if (isEditing && id) {
        const clientData = await getClientById(id);
        setClient(clientData);
      }
    };

    fetchClient();
  }, [isEditing, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateClient(id, client);
      } else {
        await createClient(client);
      }
      navigate('/clients');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      
      <div>
        <label>Nome</label>
        <input
          type="text"
          name="name"
          value={client.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Telefone</label>
        <input
          type="text"
          name="phone"
          value={client.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Saldo Devedor</label>
        <input
          type="number"
          name="balance"
          value={client.balance}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ClientForm;
