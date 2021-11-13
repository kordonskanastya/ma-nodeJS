const controllers = require('./controllers');

module.exports = (req, res) => {
  const { pathname, method } = req;

  if (pathname === '/' && method === 'GET') {
    return controllers.home(req, res);
  }
  if (pathname === '/filter' && method === 'GET') {
    return controllers.filter(req, res);
  }
  if (pathname === '/topprice' && method === 'GET') {
    return controllers.topprice(req, res);
  }
  if (pathname === '/commonprice' && method === 'GET') {
    return controllers.commonprice(req, res);
  }


  return controllers.notFound(req, res);
};
