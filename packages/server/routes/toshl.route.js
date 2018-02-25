const ctrlToshl = require('../controllers/toshl.controller');

module.exports = {
  authenticate,
  deauthorize,
  listEntries: list
};

function authenticate(req, res) {
  const code = req.body.code;

  if (!code) {
    respond({ status: 400, message: 'No authorization code provided.'});
  } else {
    ctrlToshl.authenticate(code)
      .then(onSuccess)
      .catch(onError);
  }

  function onSuccess(response) {
    respond({ status: 200 });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

function deauthorize(req, res) {
  ctrlToshl.deauthorize()
    .then(onSuccess)
    .catch(onError);

  function onSuccess(response) {
    respond({ status: 200 });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

function list(req, res) {
  const params = req.query;
  ctrlToshl.getEntries(params)
    .then(onSuccess)
    .catch(onError);

  function onSuccess(response) {
    respond({ status: 200, message: response });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}
