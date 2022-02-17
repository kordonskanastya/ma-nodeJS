const { createLogger, format, transports } = require('winston');

const { env } = require('../config');
const constants = require('./constants');

// eslint-disable-next-line arrow-body-style, no-shadow
const myFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});


const logger = createLogger({
  format: format.combine(
    format.errors({stack: true}),
    format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    myFormat,
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (env === constants.env.dev) {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.errors({stack: true}),
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      myFormat,
    ),
    transports: [new transports.Console()]
  }));
}

module.exports = logger;
