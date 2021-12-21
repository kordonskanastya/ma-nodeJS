const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('../controllers');
const discount = require('./discount');
const { authorization, errorHandler } = require('../middlewares');

const app = express();

app.use(authorization);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/discount', discount);

app.get('/', controllers.getHomePage);

app.get('/filter', controllers.getFilter);
app.post('/filter', controllers.postFilter);

app.get('/topprice', controllers.getTopprice);
app.post('/topprice', controllers.postTopprice);

app.get('/commonprice', controllers.getCommonprice);
app.post('/commonprice', controllers.postCommonprice);

app.post('/data', controllers.postData);
app.put('/data', controllers.uploadCsv);

app.use((req, res, next) => next(new Error(`Page not found ${req.path}`)));
app.use(errorHandler);

module.exports = app;


