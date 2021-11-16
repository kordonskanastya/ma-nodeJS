const controllers = require('./controllers');

module.exports = (req, res) => {
  const { pathname, method } = req;

  if (pathname === '/' && method === 'GET') {
    return controllers.home(req, res);
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
  if (pathname === '/filter' && method === 'POST') {
    return controllers.postTopprice(req, res);
  }
  if (pathname === '/commonprice' && method === 'GET') {
    return controllers.getCommonprice(req, res);
  }
  if (pathname === '/filter' && method === 'POST') {
    return controllers.postCommonprice(req, res);
  }


  return controllers.notFound(req, res);
};
