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

async function createProduct(obj) {
  try {
    if(!obj.item) {
      throw new Error('ERROR: No product item defined');
    }
    if(!obj.type) {
      throw new Error('ERROR: No product type defined');
    }
    const timestamp = Date.now();
    const [{ itemId }, isCreatedItem] = await db.Item
      .findOrCreate({
        attributes: ['itemId'],
        where: { item: obj.item }
      });
      const [{ typeId }, isCreatedType] = await db.Type
      .findOrCreate({
        attributes: ['typeId'],
        where: { type: obj.type }
      });

    const res = await db.Product.create({
      itemId,
      typeId,
      measure: obj.measure,
      measurevalue: obj.measurevalue,
      pricetype: obj.pricetype,
      pricevalue: obj.pricevalue,
      deletedAt: null,
      createdAt: timestamp,
      updatedAt: timestamp
    }, {});
    return res.dataValues;
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

async function updateProduct({id, ...obj}) {
  try {
    if (!id) {
      throw new Error('ERROR: No product id defined');
    }

    if(!Object.keys(obj).length) {
      throw new Error('ERROR: Nothing to update');
    }

    const res = await db.Product.update(obj,
      { where: { id }, returning: true }
      );

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
    await db.Product.update({ deletedAt: Date.now()}, { where: { id } });
    return true;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

 async function getProductByTypeAndPrice (type, pricevalue) {
  try {
    if (!type) {
      throw new Error('ERROR: No product type defined');
    }
    const res = await db.Product.findOne({
      where: {
        type,
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
