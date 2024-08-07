// server.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
