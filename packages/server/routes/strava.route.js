const ctrlStrava = require('../controllers/strava.controller');

module.exports = {
  authenticate,
  listActivities
};

function authenticate(req, res) {
  const code = req.body.code;

  if (!code) {
    respond({ status: 400, message: 'No authorization code provided.'});
  } else {
    ctrlStrava.oauth
      .token(code)
      .then(onSuccess)
      .catch(onError);
  }

  function onSuccess(response) {
    respond({ status: 200 });
  }

  function onError(error) {
    respond({ status: error.response.status || 500, message: error.response.data.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

function listActivities(req, res) {
  const params = req.query;
  ctrlStrava.athlete
    .activities(params)
    .then(onSuccess)
    .catch(onError);

  function onSuccess(response) {
    respond({ status: 200, message: response.data });
  }

  function onError(error) {
    respond({ status: error.response.status || 500, message: error.response.data.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}
