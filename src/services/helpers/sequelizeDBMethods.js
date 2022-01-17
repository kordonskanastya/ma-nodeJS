const name = 'sequelize';

module.exports = (db, sequelize) => {
  const { Product: productDB } = db;
  const getAllProducts = async () => {
    try {
      return await productDB.findAll({
        where: {
          deletedAt: null
        }
      });
    } catch(err) {
      console.error(err.message || err);
      throw err;
    }
  };

  const testConnection = async () => {
    try {
      console.log(`hello from ${name} test connection`);
      return await(sequelize.authenticate('SELECT NOW()'));
    } catch(err) {
      console.error(err.message || err);
      throw err;
    }
  };

  const close = async () => {
    console.log(`INFO: Closing ${name} DB wrapper`);
    return sequelize.close;
  };

  const createProduct = async (product) => {
    try {
      if(!product.item) {
        throw new Error('ERROR: No product item defined');
      }
      if(!product.type) {
        throw new Error('ERROR: No product type defined');
      }
      const timestamp = Date.now();
      const p = JSON.parse(JSON.stringify(product));

      delete p.id;
      p.measure = p.measure || 'weight';
      p.measurevalue = p.measurevalue || '0';
      p.pricetype = p.pricetype || 'pricePerKilo';
      p.pricevalue = p.pricevalue || '0';
      p.created_at = timestamp;
      p.updated_at = timestamp;

      const res = await productDB.create(p);

      console.log(`DEBUG: New product created: ${JSON.stringify(res)}`);
      return res;
    } catch(err) {
      console.error(err.message || err);
      throw err;
    }
  };

  const getProduct = async (id) => {
    try {
      if (!id) {
        throw new Error('ERROR: No product id defined');
      }
      const res = await productDB.findOne({
        where: {
          id,
          deletedAt: null
        }
    });
      return res;
    } catch (err) {
      console.error(err.message || err);
      throw err;
    }
  };

  const updateProduct = async ({id, ...product}) => {
    try {
      if (!id) {
        throw new Error('ERROR: No product id defined');
      }

      if(!Object.keys(product).length) {
        throw new Error('ERROR: Nothing to update');
      }

      const res = await productDB.update(product,
        { where: { id }, returning: true }
        );
      console.log(`DEBUG:  Product updated: ${JSON.stringify(res[1][0])}`);
      return res[1][0];

    } catch (err) {
      console.error(err.message || err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      if (!id) {
        throw new Error('ERROR: No product id defined');
      }
      // await db.Product.destroy({ where: { id } });
      await productDB.update({ deletedAt: Date.now()}, { where: { id } });
      return true;
    } catch (err) {
      console.error(err.message || err);
      throw err;
    }
  };

  const getProductByTypeAndPrice = async (type, pricevalue) => {
    try {
      if (!type) {
        throw new Error('ERROR: No product type defined');
      }
      const res = await productDB.findOne({
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
  };
  return {
    getAllProducts,
    testConnection,
    close,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductByTypeAndPrice
  };
};
