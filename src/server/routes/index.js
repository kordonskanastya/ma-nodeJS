const express = require('express');
const bodyParser = require('body-parser');

const discount = require('./discount');
const auth = require('./auth');
const commonRoutes = require('./common');
const products = require('./products');
const orders = require('./orders');
const {
  // authorization,
  errorHandler,
  authenticateToken
} = require('../middlewares');

const app = express();

// app.use(authorization);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', auth);
app.use(authenticateToken);

app.use(commonRoutes);
app.use('/discount', discount);
app.use('/products', products);
app.use('/orders', orders);

app.use((req, res) => res.status(404)
  .send({ error: `Page not found ${req.path}` }));

app.use(errorHandler);

module.exports = app;


