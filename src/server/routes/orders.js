const express = require('express');
const controllers = require('../controllers');
const joiValidator = require('../../validators/expressValidator');
const schemas = require('../../validators/schemas');

const orders = express.Router();

orders.get('/', controllers.getAllOrders);
orders.get(
  '/:id',
  joiValidator(schemas.idSchema, 'params'),
  controllers.getOrderById
);
orders.post(
  '/',
  joiValidator(schemas.orderSchema, 'body'),
  controllers.createOrder
);
orders.put(
  '/:id',
  joiValidator(schemas.idSchema, 'params'),
  joiValidator(schemas.orderSchema, 'body'),
  controllers.updateOrder
);
orders.delete(
  '/:id',
  joiValidator(schemas.idSchema, 'params'),
  controllers.deleteOrderIfExists
);

module.exports = orders;
