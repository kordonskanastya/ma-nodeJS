const idSchema = require('./idSchema');
const orderSchema = require('./orderSchema');
const productSchema = require('./productSchema');
const authSchema = require('./authSchema');
const productArraySchema = require('./productArraySchema');

module.exports = {
  idSchema,
  orderSchema,
  productSchema,
  ...authSchema,
  productArraySchema
};
