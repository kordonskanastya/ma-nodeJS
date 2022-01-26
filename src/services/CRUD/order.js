const { User, Order, Product} = require('../../db');

async function getAllOrders() {
  try {
    const res = await Order.findAll({
      where: {
        deletedAt: null,
      },
      include: User
    });
    if (!res[0]) {
      return {result: 'Orders not found'};
    }
    delete res[0].dataValues.userId;
    return res[0].dataValues;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

const getOrder = async (id) => {
  try {
    if (!id) {
      throw new Error('ERROR: No order id defined');
    }
    const res = await Order.findAll({
      where: {
        id,
        deletedAt: null
      },
      include: User
    });
    if (!res[0]) {
      return {result: `Order with id: ${id} not found`};
    }
    delete res[0].dataValues.userId;
    return res[0].dataValues;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
};

async function createOrder(obj) {
  try {
    const timestamp = Date.now();
    const product = await Product.findOne({
      where: {
        id: obj.productId,
        deletedAt: null
      }
    });
    if (!product) {
      return {result: 'Such product is absent'};
    }
    if (product.dataValues.measurevalue < obj.quantity) {
      return {result: 'We have less than you want'};
    }
    const res = await Order.create({
      ...obj,
      createdAt: timestamp,
      updateAt: timestamp,
      deletedAt: null
    });
    if (!res) {
      return {result: 'Can\'t create order'};
    }
    return getOrder(res.dataValues.id);
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function updateOrder({orderId, ...obj}) {
  try {
    if (!orderId) {
      throw new Error('ERROR: No order id defined');
    }
    const product = await Product.findOne({
      where: {
        id: obj.productId,
        deletedAt: null
      }
    });
    if (!product) {
      return {result: 'Such product is absent'};
    }
    if (product.dataValues.measurevalue < obj.quantity) {
      return {result: 'We have less than you want'};
    }
    const res = await Order.update(obj,
      { where: { id: orderId }, returning: true }
      );
      if (!res[1][0]) {
        return {result: 'Can\'t update order'};
      }
      return getOrder(res[1][0].dataValues.id);
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function deleteOrder(orderId) {
  try {
    if (!orderId) {
      throw new Error('ERROR: No product id defined');
    }
    // await db.Product.destroy({ where: { id } });
    const res = await Order
      .update({ deletedAt: Date.now()}, { where: { id: orderId } });
    if (res[0] === 1) {
      return { result: 'Order deleted' };
    }
    return { result: 'Order is not deleted' };
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

module.exports = {
  getOrder,
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
