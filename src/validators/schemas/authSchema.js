const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().max(128).required(),
  password: Joi.string().min(8).max(32).required(),
});

module.exports = { loginSchema };
