const express = require('express');
const controllers = require('../controllers');

const products = express.Router();

products.get('/', controllers.getAllProducts);
products.get('/:id', controllers.getProductById);
products.post('/', controllers.createProduct);
products.put('/:id', controllers.updateProduct);
products.delete('/:id', controllers.deleteProductIfExists);

module.exports = products;
