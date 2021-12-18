const config = require('../../config');

const { loginEnv, passwordEnv } = config;

const authorization = (req, res, next) => {
  const auth = { login: loginEnv, password: passwordEnv };
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer
    .from(b64auth, 'base64')
    .toString().split(':');

  if (login && password && login === auth.login && password === auth.password) {
    next();
  } else {
    next(new Error('Not Authorized'));

  }
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (!err) {
    res.status(200).send({ error: false });
  }
  const errorStr = err.toString();
  if (errorStr === 'Error: Not Authorized') {
    res.status(403).send({ error: errorStr });
  } else {
    res.status(500).send({ error: errorStr });
  }
};

module.exports = { authorization, errorHandler };
