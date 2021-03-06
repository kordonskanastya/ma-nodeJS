const jwt = require('jsonwebtoken');
const config = require('../../config');
const statusCode = require('../../statusCode');
const { accessTokenSecret } = require('../../config');
const logger = require('../../utils/logger');

const { loginEnv, passwordEnv } = config;

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

  if (type !== typeAuth || login !== loginEnv || password !== passwordEnv) {
    return res.status(statusCode.unauthorized)
      .send({ error: 'Unauthorized' });
  }
  return next();
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (!err) {
    return res.status(statusCode.ok).send({ error: false });
  }
  return res.status(statusCode.serverError).send({ error: err.message });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) {
    return res.status(statusCode.unauthorized).send({error: 'Unauthorized'});
  }

  return jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      logger.error(err.message || err);
      return res.status(statusCode.unauthorized).send({error: 'Unauthorized'});
    }
    req.user = user;
    return next();
  });
};

module.exports = {
  authorization,
  errorHandler,
  authenticateToken,
};
