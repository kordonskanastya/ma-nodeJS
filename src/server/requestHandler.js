const { routes, handleStreamRoutes} = require('./routes');

module.exports = (req, res) => {
  const {
    url,
    headers: { host },
  } = req;

  const { pathname, searchParams } = new URL(url, `https://${host}`);

  if (req.headers['content-type'] === 'text/csv') {
    handleStreamRoutes(req, res);
    // .catch(err => console.log('CSV handler failed', err));
    return;
  }

  let body = [];

  req
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      routes({ ...req, pathname, body, params: searchParams }, res);
    });
};
