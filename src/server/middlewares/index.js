const config = require('../../config');
const statusCode = require('../../statusCode');

const { loginEnv, passwordEnv } = config;

// eslint-disable-next-line consistent-return
const authorization = (req, res, next) => {
  const typeAuth = 'Basic';
  if (!req.headers.authorization) {
    return res.status(statusCode.unauthorized)
      .send({ error: 'Authorization header is absent' });
  }
  
  const authHeaders = (req.headers.authorization || '').split(' ');
  const [login, password] = Buffer
    .from(authHeaders[1], 'base64')
    .toString().split(':');

  if (login && password && authHeaders[0] === typeAuth
    && login === loginEnv && password === passwordEnv) {
    next();
  } else {
    return res.status(statusCode.unauthorized)
      .send({ error: 'Not Authorized' });
  }
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (!err) {
    res.status(statusCode.ok).send({ error: false });
  } else {
    res.status(statusCode.serverError).send({ error: err.message });
  }
};

module.exports = { authorization, errorHandler };
