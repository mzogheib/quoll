const ctrlStrava = require('../controllers/strava.controller');
const ctrlUsers = require('../controllers/users.controller');

module.exports = {
  listActivities
};

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
