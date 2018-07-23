const dataSourceServices = require('../data-source-services');
const ctrlUsers = require('../controllers/users.controller');
const moment = require('moment');

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
    const service = dataSourceServices[source];
    const url = service && service.getOAuthUrl();
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
    const service = dataSourceServices[source];
    const authenticate = service && service.authenticate;
    if (!authenticate) {
      respond({ status: 404, message: `Unkown feed source: ${source}` });
    } else {
      authenticate(code)
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
          }

          const service = dataSourceServices[connectedFeed.id];
          const refreshAuth = service && service.refreshAuth;
          if (!refreshAuth) {
            return Promise.reject(onError({ status: 404, message: `Unkown feed source: ${connectedFeed.id}` }))
          }

          return refreshAuth(connectedFeed.vendorAuth)
            .then(refreshedAuth => ctrlUsers.setVendorAuth(userId, connectedFeed.id, refreshedAuth))
            .catch(onError);
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
    const service = dataSourceServices[source];
    const deauthorize = service && service.deauthorize;
    if (!deauthorize) {
      respond({ status: 404, message: `Unkown feed source: ${source}` });
    } else {
      ctrlUsers.getVendorAuth(userId, source)
        .then(deauthorize)
        .then(() => ctrlUsers.setVendorAuth(userId, source, null))
        .then(onSuccess)
        .catch(onError);
    }
  }
}
