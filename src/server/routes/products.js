const express = require('express');
const controllers = require('../controllers');

const products = express.Router();

products.get('/', controllers.allProducts);
products.get('/:id', controllers.productGet);
products.post('/', controllers.productCreate);
products.put('/:id', controllers.productUpdate);
products.delete('/:id', controllers.productDelete);

module.exports = products;
