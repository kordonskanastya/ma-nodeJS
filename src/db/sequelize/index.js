const {readdirSync} = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const modelsDir = path.join(__dirname, './models');

const name = 'sequelize';

module.exports = (config) => {
  const sequelize = new Sequelize(config);
  const db = {};

  readdirSync(modelsDir)
  .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach(file => {
    // eslint-disable-next-line max-len,import/no-dynamic-require,global-require
    const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return {
    getAllProducts: async () => {
      try {
        const data = await db.Product.findAll({
          where: {
            deletedAt: { [Sequelize.Op.is]: null }
          }
        });
        return data;
      } catch(err) {
        console.error(err.message || err);
        throw err;
      }
    },

    testConnection: async () => {
      try {
        console.log(`hello from ${name} test connection`);
        return await(sequelize.authenticate('SELECT NOW()'));
      } catch(err) {
        console.error(err.message || err);
        throw err;
      }
    },

    close: async () => {
      console.log(`INFO: Closing ${name} DB wrapper`);
      return sequelize.close;
    },

    createProduct: async (product) => {
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

        const res = await db.Product.create(p);

        console.log(`DEBUG: New product created: ${JSON.stringify(res)}`);
        return res;
      } catch(err) {
        console.error(err.message || err);
        throw err;
      }
    },

    getProduct: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined');
        }
        const res = await db.Product.findOne({
          where: {
            id,
            deletedAt: { [Sequelize.Op.is]: null },
          }
      });
        return res;
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    updateProduct: async ({id, ...product}) => {
      try {
        if (!id) {
          throw new Error('ERROR: No product id defined');
        }

        if(!Object.keys(product).length) {
          throw new Error('ERROR: Nothing to update');
        }

        const res = await db.Product.update(product,
          { where: { id }, returning: true }
          );
        console.log(`DEBUG:  Product updated: ${JSON.stringify(res[1][0])}`);
        return res[1][0];

      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    deleteProduct: async (id) => {
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
    },

    getProductByTypeAndPrice: async (type, pricevalue) => {
      try {
        if (!type) {
          throw new Error('ERROR: No product type defined');
        }
        const res = await db.Product.findOne({
          where: {
            type,
            pricevalue,
            deletedAt: { [Sequelize.Op.is]: null },
          }
      });
        return res;
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },
  };
};
