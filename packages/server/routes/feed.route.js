const serviceMoves = require('../services/moves');
const serviceStrava = require('../services/strava');
const serviceToshl = require('../services/toshl');
const ctrlUsers = require('../controllers/users.controller');
const ctrlFeed = require('../controllers/feed.controller');

const getMethods = {
  moves: serviceMoves.getSegments,
  strava: serviceStrava.getAthleteActivities,
  toshl: serviceToshl.getEntries
}

module.exports = {
  get
};

function get(req, res) {
  const { source, from, to } = req.query;
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onSuccess = data => respond({ status: 200, message: data });
  const onError = error => respond({ status: error.status || 500, message: error.message });

  if (!source) {
    // respond({ status: 400, message: 'No feed source provided.' });
    getSingle(req, res);
  } else if (!from || !to) {
    respond({ status: 400, message: 'Invalid params provided.' });
  } else {
    const getMethod = getMethods[source];
    if (!getMethod) {
      respond({ status: 404, message: `Unkown feed source: ${source}` });
    } else {
      ctrlUsers.getVendorAuth(userId, source)
        .then(auth => getMethod(from, to, auth.access_token))
        .then(onSuccess)
        .catch(onError);
    }
  }
}

function getSingle (req, res) {
  const { from, to } = req.query;
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onSuccess = data => respond({ status: 200, message: data });
  const onError = error => respond({ status: error.status || 500, message: error.message });

  ctrlUsers.get(userId)
    .then(user => ctrlFeed.get(from, to, user))
    .then(onSuccess)
    .catch(onError);
}
