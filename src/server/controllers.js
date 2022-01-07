const services = require('../services');
const { badRequest } = require('../statusCode');

function getHomePage(req, res) {
  const { message, code } = services.getHomePage();
  res.status(code).send(message);
}

function getFilter(req, res) {
  const {message, code} = services.getFilter(req.query);
  res.status(code).send(message);
}

function postFilter(req, res) {
  const {message, code} = services.postFilter(
    req.query,
    req.body
    );
  res.status(code).send(message);
}

function getTopprice(req, res) {
  const {message, code} = services.getTopprice();
  res.status(code).send(message);}

function postTopprice(req, res) {
  const {message, code} = services.postTopprice(req.body);
  res.status(code).send(message);}

function getCommonprice(req, res) {
  const {message, code} = services.getCommonprice();
  res.status(code).send(message);}

function postCommonprice(req, res) {
  const {message, code} = services.postCommonprice(req.body);
  res.status(code).send(message);
}

function postData(req, res) {
  services.postData(req.body).then((result) => {
    const {message, code} = result;
    res.status(code).send(message);
  });
}

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

// eslint-disable-next-line consistent-return
async function uploadCsv(req, res) {
  try {
    if (req.headers['content-type'] !== 'text/csv') {
      throw new Error('invalid header type');
    }
    const {message, code} = await services.uploadDataCsv(req);
    res.status(code).send(message);
  }
  catch(error) {
    res.status(badRequest).send({error: error.message});
  };

};

async function allProducts(req, res) {
  try {
    const { message, code } = await services.allProducts();
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function productGet(req, res) {
  try {
    const { message, code } = await services.productGet(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
};

async function productCreate(req, res) {
  try {
    const { message, code } = await services.productCreate(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function productUpdate(req, res) {
  try {
    const { message, code } = await services.productUpdate(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

async function productDelete(req, res) {
  try {
    const { message, code } = await services.productDelete(req);
    res.status(code).send(message);
  } catch (err) {
    res.status(badRequest).send({error: err.message});
  }
}

module.exports = {
  getHomePage,
  getFilter,
  postFilter,
  getTopprice,
  postTopprice,
  getCommonprice,
  postCommonprice,
  postData,
  getArrayWithDiscountPromise,
  postArrayWithDiscountPromise,
  getArrayWithDiscountPromisify,
  postArrayWithDiscountPromisify,
  getArrayWithDiscountAsync,
  postArrayWithDiscountAsync,
  uploadCsv,
  allProducts,
  productGet,
  productCreate,
  productUpdate,
  productDelete
};
