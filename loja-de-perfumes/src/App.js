import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ProductEdit from './pages/ProductEdit';
import Navbar from './components/Navbar';
import './App.css'; // Importando o arquivo CSS
import HomeProduct from './pages/HomeProduct';
import ClientList from './pages/ClientList';
import ClientEdit from './pages/ClientEdit'; // Importando o novo componente

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<HomeProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/edit/:id" element={<ClientEdit />} /> {/* Nova rota para editar/adicionar clientes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
