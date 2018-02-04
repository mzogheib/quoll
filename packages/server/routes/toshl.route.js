const ctrlToshl = require('../controllers/toshl.controller');

module.exports = {
  listEntries: list
};

function list(req, res) {
  const params = req.query;
  ctrlToshl.entries
    .list(params)
    .then(onSuccess)
    .catch(onError);

  function onSuccess(response) {
    respond({ status: 200, message: response.data });
  }

  function onError(error) {
    respond({ status: error.response.status || 500, message: error.response.data.description });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}
