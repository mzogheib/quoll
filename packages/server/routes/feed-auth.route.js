const serviceMoves = require('../services/moves');
const serviceStrava = require('../services/strava');
const serviceToshl = require('../services/toshl');
const ctrlUsers = require('../controllers/users.controller');
const moment = require('moment');

const oAuthUrls = {
  moves: serviceMoves.getOAuthUrl(),
  strava: serviceStrava.getOAuthUrl(),
  toshl: serviceToshl.getOAuthUrl()
};

const authenticateMethods = {
  moves: serviceMoves.authenticate,
  strava: serviceStrava.authenticate,
  toshl: serviceToshl.authenticate
}

const deauthorizeMethods = {
  moves: serviceMoves.deauthorize,
  strava: serviceStrava.deauthorize,
  toshl: serviceToshl.deauthorize,
};

const refreshAuthMethods = {
  moves: serviceMoves.refreshAuth,
  strava: serviceStrava.refreshAuth,
  toshl: serviceToshl.refreshAuth,
};

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  checkAuth
};

function getOAuthUrl(req, res) {
  const { source } = req.query;
  const respond = ({ status, message }) => res.status(status).json(message);

  if (!source) {
    respond({ status: 400, message: 'No feed source provided.' });
  } else {
    const url = oAuthUrls[source];
    if (!url) {
      respond({ status: 404, message: `Unkown feed source: ${source}` });
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
  const onError = error => respond({ status: error.status || 500, message: error.message });

  if (!source) {
    respond({ status: 400, message: 'No feed source provided.' });
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

function checkAuth(req, res, next) {
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onError = error => respond({ status: error.status || 500, message: error.message });

  ctrlUsers.get(userId)
    .then(user => {
      const promises = user.feeds
        .filter(feed => feed.vendorAuth)
        .map(connectedFeed => {
          if (!connectedFeed.vendorAuth.expiry_time) {
            return Promise.resolve();
          }

          if (moment().unix() < connectedFeed.vendorAuth.expiry_time) {
            return Promise.resolve();
          } else {
            return refreshAuthMethods[connectedFeed.id](connectedFeed.vendorAuth)
              .then(refreshedAuth => ctrlUsers.setVendorAuth(userId, connectedFeed.id, refreshedAuth))
              .catch(onError);
          }
        });

      return Promise.all(promises).then(() => next());
    })
}

function deauthorize(req, res) {
  const { source } = req.query;
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onSuccess = () => respond({ status: 204 });
  const onError = error => respond({ status: error.status || 500, message: error.message });

  if (!source) {
    respond({ status: 400, message: 'No feed source provided.' });
  } else {
    const deauthorizeMethod = deauthorizeMethods[source];
    if (!deauthorizeMethod) {
      respond({ status: 404, message: `Unkown feed source: ${source}` });
    } else {
      ctrlUsers.getVendorAuth(userId, source)
        .then(deauthorizeMethod)
        .then(() => ctrlUsers.setVendorAuth(userId, source, null))
        .then(onSuccess)
        .catch(onError);
    }
  }
}
