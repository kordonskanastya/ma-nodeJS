const server = require('./server');
const db = require('./db');

function enableGracefulShutdown() {
  const exitHandler = async (error) => {
    if (error) console.log(error);
    await db.end();
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
    await db.init();
    db.setType('sequelize');

    server.start();
  } catch(err) {
    console.error(err.message || err);
  }
};

boot();
