const express = require('express');
const controllers = require('../controllers');
const { joiValidator } = require('../middlewares');
const schemas = require('../../schemas');

const products = express.Router();

products.get('/', controllers.getAllProducts);
products.get(
  '/:id',
  joiValidator(schemas.idSchema, 'params'),
  controllers.getProductById
);
products.post(
  '/',
  joiValidator(schemas.productSchema, 'body'),
  controllers.createProduct
);
products.put(
  '/:id',
  joiValidator(schemas.idSchema, 'params'),
  joiValidator(schemas.productSchema, 'body'),
  controllers.updateProduct
);
products.delete(
  '/:id',
  joiValidator(schemas.idSchema, 'params'),
  controllers.deleteProductIfExists
);

module.exports = products;
