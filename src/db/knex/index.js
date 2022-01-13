const Knex = require('knex');

const name = 'knex';
module.exports = (config) => {
  const knex = new Knex(config);

  return {
    getAllProducts: async () => {
      try {
        const data = await knex.from('products').select();
        return data;
      } catch(err) {
        console.error(err.message || err);
        throw err;
      }
    },

    testConnection: async () => {
      try {
        console.log(`hello from ${name} test connection`);
        return await(knex.raw('SELECT NOW()'));
      } catch(err) {
        console.error(err.message || err);
        throw err;
      }
    },

    close: async () => {
      console.log(`INFO: Closing ${name} DB wrapper`);
      // no close
    },

    createProduct: async (product) => {
      try {
        if(!product.item) {
          throw new Error('ERROR: No product item defined');
        }
        if(!product.type) {
          throw new Error('ERROR: No product type defined');
        }
        const timestamp = new Date();
        const p = JSON.parse(JSON.stringify(product));

        delete p.id;
        p.measure = p.measure || 'weight';
        p.measurevalue = p.measurevalue || '0';
        p.pricetype = p.pricetype || 'pricePerKilo';
        p.pricevalue = p.pricevalue || '0';
        p.created_at = timestamp;
        p.updated_at = timestamp;

        const res = await knex('products').insert(p).returning('*');

        console.log(`DEBUG: New product created: ${JSON.stringify(res[0])}`);
        return res[0];
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
        const res = await knex('products')
          .where('id', id).whereNull('deleted_at');
        return res[0];
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

        const res = await knex('products')
          .where('id', id).update(product).returning('*');

        console.log(`DEBUG:  Product updated: ${JSON.stringify(res[0])}`);
        return res[0];

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
        // await knex('products').where('id', id).del();
        await knex('products').where('id', id).update('deleted_at', new Date());

        return true;
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    getProductByTypeAndPrice: async (type, price) => {
      try {
        if (!type) {
          throw new Error('ERROR: No product type defined');
        }
        const res = await knex('products')
          .where('type', type)
          .where('pricevalue', price)
          .whereNull('deleted_at');
        return res[0];
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },
  };
};
