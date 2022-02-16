const { badRequest } = require('../../statusCode');
const { successMessage } = require('../../utils');
const orderService = require('../../services/crud/order');
const order = require('../../services/order');

async function getAllOrders(req, res) {
  try {
    const allOrdersResult = await orderService.getAllOrders();
    const { message, code } = successMessage(allOrdersResult);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function getOrderById(req, res) {
  try {
    const orderResult = await orderService.getOrderById(req.params.id);
    const { message, code } = successMessage(orderResult);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function createOrder(req, res) {
  try {
    const creatingResult = await orderService.createOrder(req.body);
    const { message, code } = successMessage(creatingResult);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function updateOrder(req, res) {
  try {
    const updatingResult = await orderService.updateOrder({
      id: req.params.id,
       ...req.body
    });
    const { message, code } = successMessage(updatingResult);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function deleteOrderIfExists(req, res) {
  try {
    const deletingResult = await orderService.deleteOrder(req.params.id);
    const { message, code } = successMessage(deletingResult);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function countDeliveryPrice(req, res) {
  try {
    const orderPrice = await order.countDeliveryPrice(req.body);
    const { message, code } = successMessage(orderPrice);
    res.status(code).send({ deliveryCost: message });
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrderIfExists,
  countDeliveryPrice
};
