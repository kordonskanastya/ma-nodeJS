const services = require('../../services');
const { badRequest } = require('../../statusCode');

function getArrayWithDiscountPromise(req, res) {
  services.getArrayWithDiscountPromise()
  .then(({message, code}) => {
    res.status(code).send(message);
  })
  .catch(error => {
    res.status(badRequest).send({error: error.message});
  });
}

function postArrayWithDiscountPromise(req, res) {
  services.postArrayWithDiscountPromise(req.body)
  .then(({message, code}) => {
    res.status(code).send(message);
  })
  .catch(error => {
    res.status(badRequest).send({error: error.message});
  });
}

function getArrayWithDiscountPromisify(req, res) {
  services.getArrayWithDiscountPromisify()
  .then(({message, code}) => {
    res.status(code).send(message);
  })
  .catch(error => {
    res.status(badRequest).send({error: error.message});
  });
}

function postArrayWithDiscountPromisify(req, res) {
  services.postArrayWithDiscountPromisify(req.body)
  .then(({message, code}) => {
    res.status(code).send(message);
  })
  .catch(error => {
    res.status(badRequest).send({error: error.message});
  });
}

async function getArrayWithDiscountAsync(req, res) {
  try {
    const {message, code} = await services.getArrayWithDiscountAsync();
    res.status(code).send(message);
  }
  catch(error) {
    res.status(badRequest).send({error: error.message});
  };
}

async function postArrayWithDiscountAsync(req, res) {
  try {
    const {message, code} = await services
      .postArrayWithDiscountAsync(req.body);
    res.status(code).send(message);
  }
  catch(error) {
    res.status(badRequest).send({error: error.message});
  };
}

module.exports = {
  getArrayWithDiscountPromise,
  postArrayWithDiscountPromise,
  getArrayWithDiscountPromisify,
  postArrayWithDiscountPromisify,
  getArrayWithDiscountAsync,
  postArrayWithDiscountAsync
};
