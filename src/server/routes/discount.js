const express = require('express');
const controllers = require('../controllers');

const discount = express.Router();

discount.get('/promise', controllers.getArrayWithDiscountPromise);

discount.post('/promise', controllers.postArrayWithDiscountPromise);

discount.get('/promisify', controllers.getArrayWithDiscountPromisify);

discount.post('/promisify', controllers.postArrayWithDiscountPromisify);

discount.get('/async', controllers.getArrayWithDiscountAsync);

discount.post('/async', controllers.postArrayWithDiscountAsync);

module.exports = discount;
