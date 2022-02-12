const express = require('express');
const { loginCheck } = require('../controllers');
const joiValidator = require('../../validators/expressValidator');
const schemas = require('../../validators/schemas');

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
