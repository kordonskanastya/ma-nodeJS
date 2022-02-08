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
  if (token === null) return res.sendStatus(statusCode.unauthorized);

  // eslint-disable-next-line consistent-return
  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      console.log(err.message || err);
      return res.sendStatus(statusCode.forbidden);
    }
    req.user = user;
    next();
  });
};

const joiValidator = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    console.log('error', message);
    res.status(statusCode.unprocessableEntity).json({ error: message });
  }
};

module.exports = {
  authorization,
  errorHandler,
  authenticateToken,
  joiValidator
};
