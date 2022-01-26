const { successMessage } = require('../../utils');
const productService = require('../../services/CRUD/product');
// eslint-disable-next-line max-len
const createUniqueProduct = require('../../services/helpers/createUniqueProduct');
const { badRequest } = require('../../statusCode');

async function getAllProducts(req, res) {
  try {
    const { message, code } = successMessage(await productService
      .getAllProducts());
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function getProductById(req, res) {
  try {
    const { message, code } = await successMessage(await productService
      .getProduct(req.params.id));
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function createProduct(req, res) {
  try {
    const { message, code } = await successMessage(
      await createUniqueProduct(req.body));
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function updateProduct(req, res) {
  try {
    const { message, code } = await successMessage(await productService
      .updateProduct({id: req.params.id, ...req.body}));
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function deleteProductIfExists(req, res) {
  try {
    const { message, code } = await successMessage(await productService
      .deleteProduct(req.params.id));
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductIfExists
};
