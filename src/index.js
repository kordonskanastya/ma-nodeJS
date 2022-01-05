const config = require('./config');

const { db: dbConfig } = config;
const db = require('./db')(dbConfig);
const server = require('./server');

function enableGracefulShutdown() {
  const exitHandler = (error) => {
    if (error) console.log(error);
    console.log('Gracefully shutting shown');
    server.stop(() => process.exit());
  };

  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);
  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);
  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
}

async function boot () {
  enableGracefulShutdown();
  try {
    // await db.createProduct(
    //   {'item':'apple','type':'Fuji','measure':'weight',
    //   'measureValue': 5, 'priceType':'pricePerKilo', 'priceValue':'$3'});

    await db.updateProduct({id: 1, 'item':'apple',
    'type':'Fuji', 'measure':'weight','measureValue': 100,
    'priceType':'pricePerKilo', 'priceValue':'$5'});

    // await db.deleteProduct(5);

    server.start();

  } catch(err) {
    console.error(err.message || err);
  }
};

boot();
