const express = require('express');
const { loginCheck } = require('../controllers');
const { joiValidator } = require('../middlewares');
const schemas = require('../../schemas');

const auth = express.Router();

// eslint-disable-next-line consistent-return
auth.post(
  '/login',
  joiValidator(schemas.loginSchema, 'body'),
  async (req, res, next) => {
  try {
    await loginCheck(req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = auth;
