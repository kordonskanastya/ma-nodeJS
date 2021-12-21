const config = require('../../config');

const { loginEnv, passwordEnv } = config;

const authorization = (req, res, next) => {
  const typeAuth = 'Basic';
  const authHeaders = (req.headers.authorization).split(' ');
  const [login, password] = Buffer
    .from(authHeaders[1], 'base64')
    .toString().split(':');

  if (login && password && authHeaders[0] === typeAuth
    && login === loginEnv && password === passwordEnv) {
    next();
  } else {
    res.status(401).send({ error: 'Not Authorized' });

  }
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (!err) {
    res.status(200).send({ error: false });
  } else {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { authorization, errorHandler };
