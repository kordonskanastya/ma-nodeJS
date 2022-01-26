const statusCode = require('../statusCode');

function exit (field) {
  console.error(`Can't working without value for field: ${field}`);
  process.exit(1);
}

function successMessage(functionMessage) {
  return {
    code: statusCode.ok,
    message: functionMessage,
  };
}

module.exports = {
  exit,
  successMessage
};
