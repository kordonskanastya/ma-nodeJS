const services = require('../../services');
const { badRequest } = require('../../statusCode');

async function getAllProducts(req, res) {
  try {
    const { message, code } = await services.getAllProducts();
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function getProductById(req, res) {
  try {
    const { message, code } = await services.getProductById(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function createProduct(req, res) {
  try {
    const { message, code } = await services.createProduct(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function updateProduct(req, res) {
  try {
    const { message, code } = await services.updateProduct(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function deleteProductIfExists(req, res) {
  try {
    const { message, code } = await services.deleteProductIfExists(req);
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
