const ctrlMoves = require('../controllers/moves.controller');
const ctrlStrava = require('../controllers/strava.controller');
const ctrlToshl = require('../controllers/toshl.controller');
const ctrlUsers = require('../controllers/users.controller');

const getMethods = {
  moves: ctrlMoves.getSegments,
  strava: ctrlStrava.getAthleteActivities,
  toshl: ctrlToshl.getEntries
}

module.exports = {
  get
};

function get(req, res) {
  const { source, from, to } = req.query;
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onSuccess = data => respond({ status: 200, message: data });
  const onError = () => respond({ status: error.status || 500, message: error.message });

  if (!source) {
    respond({ status: 400, message: 'No feed source provided.' });
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
