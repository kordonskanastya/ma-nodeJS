const jwt = require('jsonwebtoken');
const config = require('../../config');
const statusCode = require('../../statusCode');
const { accessTokenSecret } = require('../../config');

const { loginEnv, passwordEnv } = config;

// eslint-disable-next-line consistent-return
const authorization = (req, res, next) => {
  const typeAuth = 'Basic';
  if (!req.headers.authorization) {
    return res
      .status(statusCode.unauthorized)
      .send({ error: 'Authorization header is absent' });
  }

  const [type, token] = req.headers.authorization.split(' ');
  const [login, password] = Buffer
    .from(token, 'base64')
    .toString().split(':');

    // !login && !password &&
  if (type !== typeAuth || login !== loginEnv || password !== passwordEnv) {
    return res.status(statusCode.unauthorized)
      .send({ error: 'Not Authorized' });
  }
  next();
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (!err) {
    return res.status(statusCode.ok).send({ error: false });
  }
  return res.status(statusCode.serverError).send({ error: err.message });
};

// eslint-disable-next-line consistent-return
const authenticateToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);
  
  // eslint-disable-next-line consistent-return
  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      console.log(err.message || err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = { authorization, errorHandler, authenticateToken };
