const ctrlMoves = require('../controllers/moves.controller');
const ctrlUsers = require('../controllers/users.controller');

module.exports = {
  checkAuth,
  getSegments
};

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

function getSegments(req, res) {
  const params = req.query;
  const userId = req.userId;

  ctrlUsers.getVendorAuth(userId, 'moves')
    .then(auth => ctrlMoves.getSegments(params.from, params.to, auth.access_token))
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