const controllers = require('./controllers');

 const routes = (req, res) => {
  const { pathname, method } = req;

  if (pathname === '/' && method === 'GET') {
    return controllers.getHomePage(req, res);
  }
  if (pathname === '/filter' && method === 'GET') {
    return controllers.getFilter(req, res);
  }
  if (pathname === '/filter' && method === 'POST') {
    return controllers.postFilter(req, res);
  }
  if (pathname === '/topprice' && method === 'GET') {
    return controllers.getTopprice(req, res);
  }
  if (pathname === '/topprice' && method === 'POST') {
    return controllers.postTopprice(req, res);
  }
  if (pathname === '/commonprice' && method === 'GET') {
    return controllers.getCommonprice(req, res);
  }
  if (pathname === '/commonprice' && method === 'POST') {
    return controllers.postCommonprice(req, res);
  }
  if (pathname === '/data' && method === 'POST') {
    return controllers.postData(req, res);
  }

  if (pathname === '/discount/promise' && method === 'GET') {
    return controllers.getArrayWithDiscountPromise(req, res);
  }
  if (pathname === '/discount/promise' && method === 'POST') {
    return controllers.postArrayWithDiscountPromise(req, res);
  }
  if (pathname === '/discount/promisify' && method === 'GET') {
    return controllers.getArrayWithDiscountPromisify(req, res);
  }
  if (pathname === '/discount/promisify' && method === 'POST') {
    return controllers.postArrayWithDiscountPromisify(req, res);
  }
  if (pathname === '/discount/async' && method === 'GET') {
    return controllers.getArrayWithDiscountAsync(req, res);
  }
  if (pathname === '/discount/async' && method === 'POST') {
    return controllers.postArrayWithDiscountAsync(req, res);
  }

  return controllers.notFound(req, res);
};


function handleStreamRoutes(request, response) {
  const { pathname, method } = request;

  if (pathname === '/data' && method === 'PUT') {
    controllers.uploadCsv(request);
  }
  controllers.notFound(request, response);
}


module.exports = {routes, handleStreamRoutes};
