const ctrlStrava = require('../controllers/strava.controller');

module.exports = {
  authenticate,
  deauthorize,
  listActivities
};

function authenticate(req, res) {
  const code = req.body.code;

  if (!code) {
    respond({ status: 400, message: 'No authorization code provided.'});
  } else {
    ctrlStrava.authenticate(code)
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
  ctrlStrava.deauthorize()
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

function listActivities(req, res) {
  const params = req.query;
  ctrlStrava.getAthleteActivities(params)
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
