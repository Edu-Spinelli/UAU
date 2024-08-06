import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ProductEdit from './pages/ProductEdit';
import Navbar from './components/Navbar';
import './App.css'; // Importando o arquivo CSS

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/edit/:id" element={<ProductEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
