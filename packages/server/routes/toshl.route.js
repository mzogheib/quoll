const ctrlToshl = require('../controllers/toshl.controller');
const ctrlUsers = require('../controllers/users.controller');

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  checkAuth,
  listEntries: list
};

function getOAuthUrl(req, res) {
  const url = `${ctrlToshl.getOAuthUrl()}&redirect_uri=http://localhost:3000`;
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
    respond({ status: 400, message: 'No authorization code provided.' });
  } else {
    ctrlToshl.authenticate(code)
      .then(data => {
        // Calculate and store unix timestamp of when the access_token will expire
        // Substract a small amount to account for lag
        const expires_in = (data.expires_in || 3600) - 300;
        data.expiry_time = Math.floor(Date.now() / 1000 + expires_in);
        return ctrlUsers.setVendorAuth(userId, 'toshl', data);
      })
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

  ctrlUsers.getVendorAuth(userId, 'toshl')
  .then(ctrlToshl.deauthorize)
  .then(() => ctrlUsers.setVendorAuth(userId, 'toshl', null))
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

function checkAuth(req, res, next) {
  const userId = req.userId;

  ctrlUsers.getVendorAuth(userId, 'toshl')
    .then(auth => {
      const nowUnix = Math.floor(Date.now() / 1000);
      if (nowUnix < auth.expiry_time) {
        next();
      } else {
        ctrlToshl.refreshAuth(auth)
          .then(data => {
            // Calculate and store unix timestamp of when the access_token will expire
            // Substract a small amount to account for lag
            const expires_in = (data.expires_in || 3600) - 300;
            data.expiry_time = Math.floor(Date.now() / 1000 + expires_in);
            return ctrlUsers.setVendorAuth(userId, 'toshl', data).then(next);
          })
          .catch(onError);
      }
    });

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

function list(req, res) {
  const params = req.query;
  const userId = req.userId;

  ctrlUsers.getVendorAuth(userId, 'toshl')
    .then(auth => ctrlToshl.getEntries(params, auth.access_token))
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
