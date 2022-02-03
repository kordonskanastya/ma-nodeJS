const { Product, Item, Type} = require('../../db');

const emptyArray = [];

async function getAllProducts() {
  try {
    const res = await Product.findAll({
      where: {
        deletedAt: null,
      },
      attributes: {exclude: ['itemId', 'typeId']},
      include: [
        { model: Item, as: 'item' },
        { model: Type, as: 'type' }
      ]
    });
    if (!res) {
      return emptyArray;
    }
    return res;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

const getProductById = async (id) => {
  try {
    if (!id) {
      throw new Error('ERROR: No product id defined');
    }
    const res = await Product.findByPk(id, {
      attributes: {exclude: ['itemId', 'typeId']},
      include: [
        { model: Item, as: 'item' },
        { model: Type, as: 'type' }
      ]
    });
    if (!res || !res.dataValues) {
      return emptyArray;
    }
    return res.dataValues;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
};

async function createProduct(obj) {
  try {
    const timestamp = Date.now();
    const res = await Product.create({
      ...obj,
      createdAt: timestamp,
      updateAt: timestamp,
      deletedAt: null
    });
    if (!res) {
      throw new Error('Can\'t create product');
    }
    return res;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function updateProduct({id, ...obj}) {
  try {
    if (!id) {
      throw new Error('ERROR: No product id defined');
    }
    const res = await Product.update(obj,
      {
        where: { id },
        returning: true
      });
    if (!res[1][0]) {
      throw new Error('Can\'t update product');
    }
    return res[1][0];
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function deleteProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: No product id defined');
    }
    // await db.Product.destroy({ where: { id } });
    const res = await Product.update(
      {
        deletedAt: Date.now()
      },
      {
        where: id
      }
    );
    if (res[0] !== 1) {
      throw new Error('Product is not deleted');
    }
    return { result: 'Product deleted' };
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

 async function getProductByTypeAndPrice (typeId, pricevalue) {
  try {
    if (!typeId) {
      throw new Error('ERROR: No product type defined');
    }
    const res = await Product.findOne({
      where: {
        typeId,
        pricevalue,
        deletedAt: null,
      }
  });
    return res;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

module.exports = {
  getProductById,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductByTypeAndPrice
};
