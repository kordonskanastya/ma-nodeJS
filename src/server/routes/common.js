const express = require('express');
const controllers = require('../controllers');
const joiValidator = require('../../validators/expressValidator');
const schemas = require('../../validators/schemas');

const app = express.Router();

app.get('/', controllers.getHomePage);

app.get('/filter', controllers.getFilter);
app.post(
  '/filter',
  joiValidator(schemas.productArraySchema, 'body'),
  controllers.postFilter);

app.get('/topprice', controllers.getTopprice);
app.post(
  '/topprice',
  joiValidator(schemas.productArraySchema, 'body'),
  controllers.postTopprice);

app.get('/commonprice', controllers.getCommonprice);
app.post(
  '/commonprice',
  joiValidator(schemas.productArraySchema, 'body'),
  controllers.postCommonprice);

app.post(
  '/data',
  joiValidator(schemas.productArraySchema, 'body'),
  controllers.postData);
app.put('/data', controllers.uploadCsv);

module.exports = app;
