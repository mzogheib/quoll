const ctrlToshl = require('../controllers/toshl.controller');

module.exports = {
  listEntries: list
};

function list(req, res) {
  const params = req.query;
  ctrlToshl.getEntries(params)
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
