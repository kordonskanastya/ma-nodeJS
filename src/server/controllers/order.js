const { badRequest } = require('../../statusCode');
const { successMessage } = require('../../utils');
const orderService = require('../../services/CRUD/order');

async function getAllOrders(req, res) {
  try {
    const { message, code } = successMessage(await orderService.getAllOrders());
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function getOrderById(req, res) {
  try {
    const { message, code } = successMessage(await orderService
      .getOrder(req.params.id));
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function createOrder(req, res) {
  try {
    const { message, code } = successMessage(await orderService
      .createOrder(req.body));
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function updateOrder(req, res) {
  try {
    const { message, code } = successMessage(await orderService
      .updateOrder({orderId: req.params.id, ...req.body}));
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function deleteOrderIfExists(req, res) {
  try {
    const { message, code } = successMessage(await orderService
      .deleteOrder(req.params.id));
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
