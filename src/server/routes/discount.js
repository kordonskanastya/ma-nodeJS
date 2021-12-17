const express = require('express');
const controllers = require('../controllers');

const discount = express.Router();

discount.get('/promise', (req, res) => {
  controllers.getArrayWithDiscountPromise(req, res);
  });

discount.post('/promise', (req, res) => {
  controllers.postArrayWithDiscountPromise(req, res);
  });

discount.get('/promisify', (req, res) => {
  controllers.getArrayWithDiscountPromisify(req, res);
  });

discount.post('/promisify', (req, res) => {
  controllers.postArrayWithDiscountPromisify(req, res);
  });

discount.get('/async', (req, res) => {
  controllers.getArrayWithDiscountAsync(req, res);
  });

discount.post('/async', (req, res) => {
  controllers.postArrayWithDiscountAsync(req, res);
  });

module.exports = discount;
