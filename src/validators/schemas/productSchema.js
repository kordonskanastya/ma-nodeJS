const Joi = require('joi');

const orderSchema = Joi.object({
  item: Joi.string().min(3).max(128).required(),
  type: Joi.string().min(3).max(128).required(),
  measure: Joi.string().valid('weight', 'quantity').insensitive().required(),
  measurevalue: Joi.number().min(0).positive().required(),
  pricetype: Joi
    .string()
    .valid('pricePerKilo', 'pricePerItem')
    .insensitive()
    .required(),
  pricevalue: Joi
    .string()
    .pattern(/^["$"][0-9]/)
    .required(),
});

module.exports = orderSchema;
