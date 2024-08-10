import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Produtos</Link></li>
        <li><Link to="/clients">Clientes</Link></li> {/* Novo item na navbar */}
      </ul>
    </nav>
  );
};

export default Navbar;
