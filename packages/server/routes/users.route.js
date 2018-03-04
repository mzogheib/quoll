const ctrlUsers = require('../controllers/users.controller');

module.exports = {
  login,
  signup
};

function login(req, res) {
  // TODO: userId should be a bearer token?
  const userId = req.body.userId;

  if (!userId) {
    respond({ status: 400, message: 'No client key provided.' });
  } else {
    ctrlUsers.login(userId)
      .then(onSuccess)
      .catch(onError);
  }

  function onSuccess(response) {
    respond({ status: 200, message: response.message });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

function signup(req, res) {
  ctrlUsers.createUser()
    .then(onSuccess)
    .catch(onError);

  function onSuccess(response) {
    respond({ status: 200, message: response.message });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}


