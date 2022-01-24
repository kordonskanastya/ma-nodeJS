const db = require('../db');

const getProduct = async (id) => {
  try {
    if (!id) {
      throw new Error('ERROR: No product id defined');
    }
    return await db.Product.findOne({
      where: {
        id,
        deletedAt: null
      }
    });
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
};

async function updateProduct({id, ...obj}) {
  try {
    if (!id) {
      throw new Error('ERROR: No product id defined');
    }
    const res = await db.Product.update(obj,
      { where: { id }, returning: true }
      );

    return {
      ...res[1][0].dataValues,
      itemId: obj.item,
      typeId: obj.type
    };
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function createProduct(obj, {item, type}) {
  try {
    const timestamp = Date.now();
    const res = await db.Product.create({
      ...obj,
      createdAt: timestamp,
      updateAt: timestamp,
      deletedAt: null
    });

    return {
      ...res.dataValues,
      itemId: item,
      typeId: type
    };
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function getAllProducts() {
  try {
    return await db.Product.findAll({
      where: {
        deletedAt: null,
      }
    });
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
    await db.Product.update({ deletedAt: Date.now()}, { where: { id } });
    return true;
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
    const res = await db.Product.findOne({
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
  getProduct,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductByTypeAndPrice
};
