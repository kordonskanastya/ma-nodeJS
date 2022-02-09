const express = require('express');
const controllers = require('../controllers');
const { joiValidator } = require('../middlewares');
const schemas = require('../../schemas');

const discount = express.Router();

discount.get('/promise', controllers.getArrayWithDiscountPromise);

discount.post(
  '/promise',
  joiValidator(schemas.productArraySchema, 'body'),
  controllers.postArrayWithDiscountPromise);

discount.get('/promisify', controllers.getArrayWithDiscountPromisify);

discount.post(
  '/promisify',
  joiValidator(schemas.productArraySchema, 'body'),
  controllers.postArrayWithDiscountPromisify);

discount.get('/async', controllers.getArrayWithDiscountAsync);

discount.post(
  '/async',
  joiValidator(schemas.productArraySchema, 'body'),
  controllers.postArrayWithDiscountAsync);

module.exports = discount;
