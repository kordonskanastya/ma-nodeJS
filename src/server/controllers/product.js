const { successMessage } = require('../../utils');
const productService = require('../../services/crud/product');
// eslint-disable-next-line max-len
const createUniqueProduct = require('../../services/helpers/createUniqueProduct');
const { badRequest } = require('../../statusCode');

async function getAllProducts(req, res) {
  try {
    const allProductsResult = await productService.getAllProducts();
    const { message, code } = successMessage(allProductsResult);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function getProductById(req, res) {
  try {
    const productResult = await productService.getProductById(req.params.id);
    const { message, code } = successMessage(productResult);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function createProduct(req, res) {
  try {
    const creatingResult = await createUniqueProduct(req.body);
    const { message, code } = successMessage(creatingResult);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function updateProduct(req, res) {
  try {
    const updatingResult = await productService.updateProduct({
      id: req.params.id,
       ...req.body
    });
    const { message, code } = successMessage(updatingResult);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function deleteProductIfExists(req, res) {
  try {
    const deletingResult = await productService.deleteProduct(req.params.id);
    const { message, code } = successMessage(deletingResult);
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
