const Joi = require('joi');

const orderSchema = Joi.object({
  productId: Joi.number().min(1).positive().required(),
  quantity: Joi.number().min(1).positive().required(),
  userId: Joi.number().min(1).positive().required(),
});

const orderPriceSchema = Joi.object({
  orderId: Joi.number().min(1).positive().required(),
  citySender: Joi.string().min(3).max(128).required(),
  cityReceiver: Joi.string().min(3).max(128).required(),
});

module.exports = {
  orderSchema,
  orderPriceSchema
};
