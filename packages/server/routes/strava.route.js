const ctrlStrava = require('../controllers/strava.controller');
const ctrlUsers = require('../controllers/users.controller');

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  listActivities
};

function getOAuthUrl(req, res) {
  const url = `${ctrlStrava.getOAuthUrl()}&redirect_uri=http://localhost:3000`;
  onSuccess(url);

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

function authenticate(req, res) {
  const code = req.body.code;
  const userId = req.userId;

  if (!code) {
    respond({ status: 400, message: 'No authorization code provided.'});
  } else {
    ctrlStrava.authenticate(code)
      .then(data => ctrlUsers.setVendorAuth(userId, 'strava', data))
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
  const userId = req.userId;

  ctrlUsers.getVendorAuth(userId, 'strava')
    .then(ctrlStrava.deauthorize)
    .then(() => ctrlUsers.setVendorAuth(userId, 'strava', null))
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
  const userId = req.userId;

  ctrlUsers.getVendorAuth(userId, 'strava')
    .then(auth => ctrlStrava.getAthleteActivities(params.from, params.to, auth.access_token))
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
