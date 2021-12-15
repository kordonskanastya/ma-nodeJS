const express = require('express');
const controllers = require('../controllers');

const app = express();

app.get('/', (req, res) => controllers.getHomePage(req, res));

app.get('/filter', (req, res) => controllers.getFilter(req, res));

app.post('/filter', (req, res) => controllers.postFilter(req, res));

app.get('/topprice', (req, res) => controllers.getTopprice(req, res));

app.post('/topprice', (req, res) => controllers.postTopprice(req, res));

app.get('/commonprice', (req, res) => controllers.getCommonprice(req, res));

app.post('/commonprice', (req, res) => controllers.postCommonprice(req, res));

app.post('/data', (req, res) => controllers.postData(req, res));


module.exports = app;

  // if (pathname === '/discount/promise' && method === 'GET') {
  //   return controllers.getArrayWithDiscountPromise(req, res);
  // }
  // if (pathname === '/discount/promise' && method === 'POST') {
  //   return controllers.postArrayWithDiscountPromise(req, res);
  // }
  // if (pathname === '/discount/promisify' && method === 'GET') {
  //   return controllers.getArrayWithDiscountPromisify(req, res);
  // }
  // if (pathname === '/discount/promisify' && method === 'POST') {
  //   return controllers.postArrayWithDiscountPromisify(req, res);
  // }
  // if (pathname === '/discount/async' && method === 'GET') {
  //   return controllers.getArrayWithDiscountAsync(req, res);
  // }
  // if (pathname === '/discount/async' && method === 'POST') {
  //   return controllers.postArrayWithDiscountAsync(req, res);
  // }

  // return controllers.notFound(req, res);



// function handleStreamRoutes(request, response) {
//   const { url, method } = request;

//   if (url === '/data' && method === 'PUT') {
//     return controllers.uploadCsv(request, response);
//   }
//   return controllers.notFound(request, response);
// }



