# Loja de Perfumes

Este é um projeto de aplicação web para gerenciar uma loja de perfumes, implementado com React no frontend e Node.js no backend, utilizando MySQL como banco de dados.

## Funcionalidades

- Listar perfumes
- Adicionar novos perfumes
- Editar perfumes existentes
- Visualizar detalhes dos perfumes
- Excluir perfumes

## Requisitos

- Node.js
- npm (Node Package Manager)
- MySQL

## Configuração do Backend

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/seu-usuario/loja-de-perfumes.git
cd loja-de-perfumes/backend
```

### Passo 2: Instalar dependências

```bash
npm install
```

### Passo 3: Configurar o banco de dados

Certifique-se de ter o MySQL instalado e em execução. Crie o banco de dados e a tabela necessária:

```sql
CREATE DATABASE loja_de_perfumes;

USE loja_de_perfumes;

CREATE TABLE Perfumes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);
```

### Passo 4: Configurar a conexão com o banco de dados

Atualize o arquivo `config/database.js` com as suas credenciais do MySQL:

```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('loja_de_perfumes', 'seu_usuario', 'sua_senha', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
```

### Passo 5: Popular o banco de dados (opcional)

Para popular o banco de dados com dados fictícios, você pode executar os seguintes comandos SQL:

```sql
INSERT INTO Perfumes (name, description) VALUES
('Perfume A', 'Descrição do Perfume A'),
('Perfume B', 'Descrição do Perfume B'),
('Perfume C', 'Descrição do Perfume C'),
('Perfume D', 'Descrição do Perfume D'),
('Perfume E', 'Descrição do Perfume E'),
('Perfume F', 'Descrição do Perfume F'),
('Perfume G', 'Descrição do Perfume G'),
('Perfume H', 'Descrição do Perfume H'),
('Perfume I', 'Descrição do Perfume I'),
('Perfume J', 'Descrição do Perfume J');
```

### Passo 6: Iniciar o servidor backend

```bash
node server.js
```

O servidor estará rodando em `http://localhost:3001`.

## Configuração do Frontend

### Passo 1: Navegar para o diretório do frontend

```bash
cd ../frontend
```

### Passo 2: Instalar dependências

```bash
npm install
```

### Passo 3: Iniciar o servidor frontend

```bash
npm start
```

O frontend estará rodando em `http://localhost:3000`.

## Estrutura do Projeto

```
loja-de-perfumes/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── perfumeController.js
│   ├── models/
│   │   └── Perfume.js
│   ├── routes/
│   │   └── perfumeRoutes.js
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── ProductCard.js
    │   │   ├── ProductForm.js
    │   │   └── ProductList.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── ProductDetail.js
    │   │   └── ProductEdit.js
    │   ├── services/
    │   │   └── perfumeService.js
    │   ├── App.css
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    └── package.json
```

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões ou encontrar problemas, por favor, abra uma issue ou envie um pull request.

