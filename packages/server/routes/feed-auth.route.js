const ctrlMoves = require('../controllers/moves.controller');
const ctrlStrava = require('../controllers/strava.controller');
const ctrlToshl = require('../controllers/toshl.controller');
const ctrlUsers = require('../controllers/users.controller');

const oAuthUrls = {
  moves: ctrlMoves.getOAuthUrl(),
  strava: ctrlStrava.getOAuthUrl(),
  toshl: ctrlToshl.getOAuthUrl()
};

const authenticateMethods = {
  moves: ctrlMoves.authenticate,
  strava: ctrlStrava.authenticate,
  toshl: ctrlToshl.authenticate
}

const deauthorizeMethods = {
  moves: ctrlMoves.deauthorize,
  strava: ctrlStrava.deauthorize,
  toshl: ctrlToshl.deauthorize,
};

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize
};

function getOAuthUrl(req, res) {
  const { source } = req.query;
  const respond = ({ status, message }) => res.status(status).json(message);

  if (!source) {
    respond({ status: 400, message: 'No feed source provided.'});
  } else {
    const url = oAuthUrls[source];
    if (!url) {
      respond({ status: 404, message: `Unkown feed source: ${source}`});
    } else {
      respond({ status: 200, message: url });
    }
  }
}

function authenticate(req, res) {
  const { source } = req.query;
  const { code } = req.body;
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onSuccess = () => respond({ status: 200 });
  const onError = () => respond({ status: error.status || 500, message: error.message });

  if (!source) {
    respond({ status: 400, message: 'No feed source provided.'});
  } else if (!code) {
    respond({ status: 400, message: 'No authorization code provided.' });
  } else {
    const authenticateMethod = authenticateMethods[source];
    if (!authenticateMethod) {
      respond({ status: 404, message: `Unkown feed source: ${source}` });
    } else {
      authenticateMethod(code)
        .then(data => ctrlUsers.setVendorAuth(userId, source, data))
        .then(onSuccess)
        .catch(onError);
    }
  }
}

function deauthorize(req, res) {
  const { source } = req.query;
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onSuccess = () => respond({ status: 204 });
  const onError = () => respond({ status: error.status || 500, message: error.message });

  if (!source) {
    respond({ status: 400, message: 'No feed source provided.'});
  } else {
    const deauthorizeMethod = deauthorizeMethods[source];
    if (!deauthorizeMethod) {
      respond({ status: 404, message: `Unkown feed source: ${source}`});
    } else {
      ctrlUsers.getVendorAuth(userId, source)
        .then(deauthorizeMethod)
        .then(() => ctrlUsers.setVendorAuth(userId, source, null))
        .then(onSuccess)
        .catch(onError);
    }
  }
}
