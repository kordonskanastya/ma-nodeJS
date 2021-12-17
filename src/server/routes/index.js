const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('../controllers');
const discount = require('./discount');
const { authorization, errorHandler } = require('../middlewares');

const app = express();

app.use(authorization);

app.put('/data', (req, res, next) => {
  if (req.headers['content-type'] === 'text/csv') {
   controllers.uploadCsv(req, res);
 } else {
   next(new Error('wrong header'));
 }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => controllers.getHomePage(req, res));

app.get('/filter', (req, res) => controllers.getFilter(req, res));
app.post('/filter', (req, res) => controllers.postFilter(req, res));

app.get('/topprice', (req, res) => controllers.getTopprice(req, res));
app.post('/topprice', (req, res) => controllers.postTopprice(req, res));

app.get('/commonprice', (req, res) => controllers.getCommonprice(req, res));
app.post('/commonprice', (req, res) => controllers.postCommonprice(req, res));

app.post('/data', (req, res) => controllers.postData(req, res));

app.use('/discount', discount);

app.use((req, res) => controllers.notFound(req, res));

app.use(errorHandler);

module.exports = app;


