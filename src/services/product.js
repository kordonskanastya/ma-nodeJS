const {Product: product} = require('../db');

const getProduct = async (id) => {
  try {
    if (!id) {
      throw new Error('ERROR: No product id defined');
    }
    return await product.findOne({
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
    const p = JSON.parse(JSON.stringify(obj));

    delete p.id;
    p.measure = p.measure || 'weight';
    p.measurevalue = p.measurevalue || '0';
    p.pricetype = p.pricetype || 'pricePerKilo';
    p.pricevalue = p.pricevalue || '0';
    p.created_at = timestamp;
    p.updated_at = timestamp;

    const res = await product.create(p);
    return res.dataValues;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function getAllProducts() {
  try {
    return await product.findAll({
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

    const res = await product.update(obj,
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
    await product.update({ deletedAt: Date.now()}, { where: { id } });
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
    const res = await product.findOne({
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
