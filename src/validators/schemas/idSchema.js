const Joi = require('joi');

const idSchema = Joi.object({
  id: Joi.number().min(1).positive(),
});

module.exports = idSchema;
