const ctrlMoves = require('../controllers/moves.controller');
const ctrlUsers = require('../controllers/users.controller');

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  checkAuth,
  getStoryline
};

function getOAuthUrl(req, res) {
  const url = ctrlMoves.getOAuthUrl();
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
    ctrlMoves.authenticate(code)
      .then(data => {
        data.expiry_time = calculateExpiryTime(data.expires_in);
        return ctrlUsers.setVendorAuth(userId, 'moves', data);
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

  ctrlUsers.setVendorAuth(userId, 'moves', null)
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

  ctrlUsers.getVendorAuth(userId, 'moves')
    .then(auth => {
      const nowUnix = Math.floor(Date.now() / 1000);
      if (nowUnix < auth.expiry_time) {
        next();
      } else {
        ctrlMoves.refreshAuth(auth)
          .then(data => {
            data.expiry_time = calculateExpiryTime(data.expires_in);
            return ctrlUsers.setVendorAuth(userId, 'moves', data).then(next);
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

function getStoryline(req, res) {
  const params = req.query;
  const userId = req.userId;

  ctrlUsers.getVendorAuth(userId, 'moves')
    .then(auth => ctrlMoves.getStoryline(params.from, params.to, auth.access_token))
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

function calculateExpiryTime(expiresIn) {
  // Substract a small amount to account for lag
  return Math.floor(Date.now() / 1000 + (expiresIn || 3600) - 300);
}