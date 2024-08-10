import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Registrando as escalas necessárias
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Home = () => {
  // Dados de exemplo para os gráficos
  const barData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Vendas Mensais',
        data: [1200, 1900, 3000, 5000, 2300, 3400],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Receita Acumulada',
        data: [3000, 4000, 5000, 7000, 9000, 12000],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Perfumes', 'Cremes', 'Cosméticos', 'Acessórios'],
    datasets: [
      {
        data: [3000, 1500, 2000, 1000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
      },
    ],
  };

  return (
    <div className="home">
      <h1>Dashboard</h1>
      <div className="charts-container">
        <div className="chart">
          <h3>Vendas Mensais</h3>
          <Bar data={barData} />
        </div>
        <div className="chart">
          <h3>Receita Acumulada</h3>
          <Line data={lineData} />
        </div>
        <div className="chart">
          <h3>Distribuição de Categorias</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
      <div className="reports">
        <h2>Relatórios</h2>
        <ul>
          <li>Total de vendas no mês: R$ 15.400,00</li>
          <li>Clientes ativos: 150</li>
          <li>Produtos em estoque: 350 unidades</li>
          <li>Receita projetada para o próximo mês: R$ 20.000,00</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
