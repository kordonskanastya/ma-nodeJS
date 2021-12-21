const express = require('express');
const controllers = require('../controllers');

const app = express.Router();

app.get('/', controllers.getHomePage);

app.get('/filter', controllers.getFilter);
app.post('/filter', controllers.postFilter);

app.get('/topprice', controllers.getTopprice);
app.post('/topprice', controllers.postTopprice);

app.get('/commonprice', controllers.getCommonprice);
app.post('/commonprice', controllers.postCommonprice);

app.post('/data', controllers.postData);
app.put('/data', controllers.uploadCsv);

module.exports = app;
