const { Product, Item, Type} = require('../../db');

async function getAllProducts() {
  try {
    const res = await Product.findAll({
      where: {
        deletedAt: null,
      },
      include: [
        { model: Item },
        { model: Type }
      ]
    });
    if (!res[0]) {
      return {result: 'Products not found'};
    }
    delete res[0].dataValues.itemId;
    delete res[0].dataValues.typeId;
    return res[0].dataValues;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

const getProduct = async (id) => {
  try {
    if (!id) {
      throw new Error('ERROR: No product id defined');
    }
    const res = await Product.findAll({
      where: {
        id,
        deletedAt: null
      },
      include: [
        { model: Item },
        { model: Type }
      ]
    });
    if (!res[0]) {
      return { result: `Product with id: ${id} not found` };
    }
    delete res[0].dataValues.itemId;
    delete res[0].dataValues.typeId;
    return res[0].dataValues;
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
      return { result: 'Can\'t create product' };
    }
    return getProduct(res.dataValues.id);
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
      { where: { id }, returning: true }
      );
    if (!res[1][0]) {
      return { result: 'Can\'t update product' };
    }
    return getProduct(res[1][0].dataValues.id);
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
    const res = await Product
      .update({ deletedAt: Date.now()}, { where: { id } });
    if (res[0] === 1) {
      return { result: 'Product deleted' };
    }
    return { result: 'Product is not deleted' };
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
  getProduct,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductByTypeAndPrice
};
