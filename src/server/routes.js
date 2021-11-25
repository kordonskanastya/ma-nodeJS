const controllers = require('./controllers');

module.exports = (req, res) => {
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
    return controllers.getPromise(req, res);
  }
  if (pathname === '/discount/promise' && method === 'POST') {
    return controllers.postPromise(req, res);
  }


  return controllers.notFound(req, res);
};
