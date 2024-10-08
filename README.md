# Loja de Perfumes

Este projeto é uma aplicação web para gerenciar uma loja de perfumes e outros produtos relacionados. A aplicação permite criar, editar, visualizar e excluir produtos, organizar os produtos em categorias predefinidas, gerenciar clientes, e filtrar produtos por categorias. A aplicação é construída utilizando Node.js no backend e React no frontend, e integra com um banco de dados MySQL para armazenamento dos dados.

## Tecnologias Utilizadas

### Backend

- **Node.js**: Plataforma JavaScript para desenvolvimento do servidor.
- **Express.js**: Framework para construir APIs RESTful.
- **Sequelize**: ORM para interação com o banco de dados MySQL.
- **MySQL**: Banco de dados relacional para armazenamento dos dados.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **dotenv**: Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`.

### Frontend

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router**: Biblioteca para gerenciar rotas no React.
- **Axios**: Biblioteca para fazer requisições HTTP.

## Funcionalidades

- **Gerenciamento de Produtos**: Criação, edição, visualização e exclusão de produtos.
- **Categorias de Produtos**: Organização dos produtos em categorias predefinidas como Perfumes, Desodorantes, Cremes, Cosméticos, etc.
- **Busca de Imagens**: Integração com a API do Google Custom Search para buscar imagens dos produtos automaticamente.
- **Filtro por Categorias**: Possibilidade de filtrar produtos por categorias na página principal.
- **Gerenciamento de Clientes**: Criação, edição, visualização e exclusão de clientes com informações como nome, telefone e saldo devedor.
- **Validação de Quantidade**: Não permite adicionar ou editar produtos com quantidade menor ou igual a zero.
- **Efeito Visual no Frontend**: Ao passar o mouse sobre os cards de produtos, o conteúdo é suavemente borrado e a descrição é exibida.

## Visão Geral da Aplicação

Abaixo estão capturas de tela que mostram diferentes partes da aplicação em funcionamento:

### Home Page - Dashboard

Na página inicial, você encontra um dashboard com gráficos e relatórios que fornecem uma visão geral do desempenho da loja.

![Home Page - Dashboard](./images/img1.png)

### Tela de Produtos

A tela de produtos permite gerenciar os itens da loja, onde você pode adicionar, editar, visualizar e remover produtos. Os produtos são organizados em categorias para facilitar a navegação e o gerenciamento.

![Tela de Produtos](./images/img2.png)

### Tela de Clientes

Na tela de clientes, você pode gerenciar informações dos clientes, incluindo nome, telefone e saldo devedor. A interface permite adicionar, editar e remover clientes facilmente.

![Tela de Clientes](./images/img3.png)

## Configuração do Projeto

### Requisitos

- Node.js
- MySQL

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd loja-de-perfumes
   ```

2. **Configuração do Backend:**

   Navegue até o diretório do backend e instale as dependências:

   ```bash
   cd backend
   npm install
   ```

3. **Configuração do Frontend:**

   Navegue até o diretório do frontend e instale as dependências:

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configuração do Banco de Dados:**

   - Crie um banco de dados MySQL chamado `loja_de_perfumes`.
   - Execute o script SQL para criar as tabelas e inserir as categorias:

     ```sql
     CREATE TABLE Categories (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL
     );

     CREATE TABLE Products (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       price DECIMAL(10, 2) NOT NULL,
       imageUrl VARCHAR(255),
       categoryId INT,
       quantity INT NOT NULL DEFAULT 1,
       FOREIGN KEY (categoryId) REFERENCES Categories(id)
     );

     CREATE TABLE Clients (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       phone VARCHAR(20) NOT NULL,
       balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00
     );

     CREATE TABLE Sales (
       id INT AUTO_INCREMENT PRIMARY KEY,
       clientId INT,
       saleDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       totalAmount DECIMAL(10, 2) NOT NULL,
       amountPaid DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
       remainingBalance DECIMAL(10, 2) GENERATED ALWAYS AS (totalAmount - amountPaid) STORED,
       FOREIGN KEY (clientId) REFERENCES Clients(id)
     );

     CREATE TABLE SaleItems (
       id INT AUTO_INCREMENT PRIMARY KEY,
       saleId INT,
       productId INT,
       quantity INT NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       FOREIGN KEY (saleId) REFERENCES Sales(id),
       FOREIGN KEY (productId) REFERENCES Products(id)
     );

     INSERT INTO Categories (name) VALUES
     ('Perfumes'),
     ('Desodorantes'),
     ('Cremes'),
     ('Cosméticos'),
     ('Maquiagem'),
     ('Cuidados com a Pele'),
     ('Cuidados com o Cabelo'),
     ('Higiene Pessoal'),
     ('Acessórios');
     ```

5. **Configuração do Arquivo `.env`:**

   Crie um arquivo `.env` no diretório do backend com as seguintes variáveis:

   ```env
   GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
   SEARCH_ENGINE_ID=YOUR_SEARCH_ENGINE_ID
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=loja_de_perfumes
   ```

   Substitua `YOUR_GOOGLE_API_KEY` e `YOUR_SEARCH_ENGINE_ID` pelas suas chaves da API do Google Custom Search, e configure as credenciais do banco de dados MySQL.

6. **Adicione o `.env` ao `.gitignore` para garantir que suas chaves de API e outras informações sensíveis não sejam incluídas no repositório Git:**

   ```bash
   echo ".env" >> .gitignore
   ```

### Executando a Aplicação

1. **Inicie o servidor backend:**

   ```bash
   cd backend
   node server.js
   ```

2. **Inicie o servidor frontend:**

   ```bash
   cd ../frontend
   npm start
   ```

3. **Acesse a aplicação no navegador:**

   Abra o navegador e vá para `http://localhost:3000`.

## API Endpoints

### Produtos

- **GET /api/products**: Retorna todos os produtos.
- **GET /api/products/:id**: Retorna um produto pelo ID.
- **POST /api/products**: Cria um novo produto.
- **PUT /api/products/:id**: Atualiza um produto pelo ID.
- **DELETE /api/products/:id**: Deleta um produto pelo ID.

### Categorias

- **GET /api/categories**: Retorna todas as categorias.

### Clientes

- **GET /api/clients**: Retorna todos os clientes.
- **GET /api/clients/:id**: Retorna um cliente pelo ID.
- **POST /api/clients**: Cria um novo cliente.
- **PUT /api/clients/:id**: Atualiza um cliente pelo ID.
- **DELETE /api/clients/:id**: Deleta um cliente pelo ID.

## Estrutura do Projeto

```plaintext
loja-de-perfumes/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── clientController.js
│   │   └── saleController.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Client.js
│   │   ├── Sale.js
│   │   └── SaleItem.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── clientRoutes.js
│   │   └── saleRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.js
│   │   │   ├── ProductCard.js
│   │   │   ├── CategoryFilter.js
│   │   │   ├── ProductList.js
│   │   │   ├── ClientForm.js
│   │   │   ├── ClientList.js
│   │   └── pages/
│   │   │   ├── Home.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── ProductEdit.js
│   │   │   ├── ClientEdit.js
│   │   │   ├── HomeProduct.js
│   │   │   └── ClientList.js
│   │   ├── services/
│   │   │   ├── productService.js
│   │   │   ├── categoryService.js
│   │   │   ├── clientService.js
│   │   │   └── saleService.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── .env
│   └── package.json
└── README.md
```

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Faça um fork do repositório, crie uma branch para suas alterações, e envie um pull request.
