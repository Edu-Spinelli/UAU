// src/pages/ClientEdit.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClientForm from '../components/ClientForm';
import { getClientById } from '../services/clientService';

const ClientEdit = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const isEditing = id !== 'new';

  useEffect(() => {
    if (isEditing) {
      const fetchData = async () => {
        const result = await getClientById(id);
        setClient(result);
      };

      fetchData();
    }
  }, [id, isEditing]);

  return (
    <div>
      <h1>{isEditing ? 'Edit Client' : 'Add Client'}</h1>
      <ClientForm client={client} isEditing={isEditing} />
    </div>
  );
};

export default ClientEdit;
