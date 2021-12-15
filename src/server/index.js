const config = require('../config');
const app = require('./routes');

// const requestHandler = require('./requestHandler');

const { port } = config;

function start() {
  app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`);
  });
}

function stop(serverFunc, callback) {
  serverFunc().close((err) => {
    if (err) {
      console.log(err, 'Failed to close the server');
      callback();
      return;
    }
    console.log('Server has been stopped');
    callback();
  });
}

module.exports = { start, stop };
