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

const writeRes = (res, strErr, code) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ error: strErr }));
  res.status(code);
  res.end();
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (!err) {
    res.json({ error: false });
    res.status(200);
    res.end();
  }
  if (err.toString() === 'Error: Not Authorized') {
    writeRes(res, err.toString(), 403);
  } else {
    writeRes(res, err.toString(), 500);
  }
};

module.exports = { authorization, errorHandler };
