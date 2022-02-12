const { User, Order, Product} = require('../../db');
const { env } = require('../../config');
const Constants = require('../../Constants');

const emptyArray = [];

async function getAllOrders() {
  try {
    const res = await Order.findAll({
      where: {
        deletedAt: null,
      },
      attributes: {exclude: ['userId', 'productId']},
      include: [
        { model: User, as: 'user' },
        { model: Product, as: 'product' }
      ]
    });
    if (!res[0]) {
      return emptyArray;
    }
    return res;
  } catch (err) {
    if ( env === Constants.env.dev ) {
      console.error(err.message || err);
    }
    throw err;
  }
}

const getOrderById = async (id) => {
  try {
    const res = await Order.findByPk(id, {
      attributes: {exclude: ['userId', 'productId']},
      include: [
        { model: User, as: 'user' },
        { model: Product, as: 'product' }
      ]
    });
    if (!res || !res.dataValues) {
      return emptyArray;
    }
    return res.dataValues;
  } catch (err) {
    if ( env === Constants.env.dev ) {
      console.error(err.message || err);
    }
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
      return emptyArray;
    }
    if (product.dataValues.measurevalue < obj.quantity) {
      throw new Error('We have less quantity than you want');
    }
    const res = await Order.create({
      ...obj,
      createdAt: timestamp,
      updateAt: timestamp,
      deletedAt: null
    });
    if (!res) {
      throw new Error('Can\'t create order');
    }
    return res;
  } catch (err) {
    if ( env === Constants.env.dev ) {
      console.error(err.message || err);
    }
    throw err;
  }
}

async function updateOrder({id, ...obj}) {
  try {
    const product = await Product.findOne({
      where: {
        id: obj.productId,
        deletedAt: null
      }
    });
    if (!product) {
      throw new Error('Can\'t update order. Such product is absent');
    }
    if (product.dataValues.measurevalue < obj.quantity) {
      throw new Error('We have less than you want');
    }
    const res = await Order.update(obj,
      {
        where: { id },
        returning: true
      });
      if (!res[1][0]) {
        throw new Error('Can\'t update order');
      }
      return res[1][0];
  } catch (err) {
    if ( env === Constants.env.dev ) {
      console.error(err.message || err);
    }
    throw err;
  }
}

async function deleteOrder(orderId) {
  try {
    // await db.Product.destroy({ where: { id } });
    const res = await Order.update(
      {
        deletedAt: Date.now()
      },
      {
        where: { id: orderId}
      }
    );
    if (res[0] !== 1) {
      throw new Error('Order is not deleted');
    }
    return { result: 'Order deleted' };
  } catch (err) {
    if ( env === Constants.env.dev ) {
      console.error(err.message || err);
    }
    throw err;
  }
}

module.exports = {
  getOrderById,
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
