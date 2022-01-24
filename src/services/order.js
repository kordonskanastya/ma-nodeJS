const db = require('../db');

const getOrder = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error('ERROR: No order id defined');
    }
    return await db.Order.findOne({
      where: {
        orderId,
        deletedAt: null
      }
    });
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
};

async function updateOrder({orderId, ...obj}) {
  try {
    if (!orderId) {
      throw new Error('ERROR: No order id defined');
    }
    const product = await db.Product.findOne({
      where: {
        id: obj.productId,
        deletedAt: null
      }
    });
    if (!product) {
      return 'Such product is absent';
    }
    if (product.dataValues.measurevalue < obj.quantity) {
      return 'We have less than you want';
    }
    const res = await db.Order.update(obj,
      { where: { orderId }, returning: true }
      );

    return res[1][0].dataValues;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function createOrder(obj) {
  try {
    const timestamp = Date.now();
    const product = await db.Product.findOne({
      where: {
        id: obj.productId,
        deletedAt: null
      }
    });
    if (!product) {
      return 'Such product is absent';
    }
    if (product.dataValues.measurevalue < obj.quantity) {
      return 'We have less than you want';
    }
    const res = await db.Order.create({
      ...obj,
      createdAt: timestamp,
      updateAt: timestamp,
      deletedAt: null
    });

    return res.dataValues;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function getAllOrders() {
  try {
    return await db.Order.findAll({
      where: {
        deletedAt: null,
      }
    });
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
    await db.Order.update({ deletedAt: Date.now()}, { where: { orderId } });
    return true;
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
