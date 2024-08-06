// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/products', productRoutes);

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
