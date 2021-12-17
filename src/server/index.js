const config = require('../config');
const app = require('./routes');

const { port } = config;

const listener = app.listen(port, () => {
  console.log(`Server successfully started on port ${port}`);
});

const start = () => listener;

function stop(callback) {
  if (!listener) {
    callback();
    return;
  }
  listener.close((err) => {
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
