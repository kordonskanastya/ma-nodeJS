const Joi = require('joi');

const orderSchema = Joi.object({
  productId: Joi.number().min(1).positive().required(),
  quantity: Joi.number().min(1).positive().required(),
  userId: Joi.number().min(1).positive().required(),
});

module.exports = orderSchema;
