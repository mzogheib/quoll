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
    respond({ status: 200, message: 'Here\'s your code back: ' + code});
  }

  function onSuccess(response) {
    respond({ status: 200, message: response });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.msg });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

function listActivities(req, res) {
  const params = req.query;
  ctrlStrava.activities
    .list(params)
    .then(onSuccess)
    .catch(onError);

  function onSuccess(response) {
    respond({ status: 200, message: response });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.msg });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}
