const express = require('express');
const { loginCheck } = require('../controllers');

const auth = express.Router();

// eslint-disable-next-line consistent-return
auth.post('/login', async (req, res, next) => {
  try {
    await loginCheck(req, res);
  } catch (err) {
    return next(err);
  }
});

module.exports = auth;
