const services = require('../../services');
const { badRequest } = require('../../statusCode');

async function getAllOrders(req, res) {
  try {
    const { message, code } = await services.getAllOrders();
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function getOrderById(req, res) {
  try {
    const { message, code } = await services.getOrderById(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function createOrder(req, res) {
  try {
    const { message, code } = await services.createOrder(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function updateOrder(req, res) {
  try {
    const { message, code } = await services.updateOrder(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function deleteOrderIfExists(req, res) {
  try {
    const { message, code } = await services.deleteOrderIfExists(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrderIfExists
};
