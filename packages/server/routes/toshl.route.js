const ctrlToshl = require('../controllers/toshl.controller');

module.exports = {
  list: list
};

function list(req, res) {

  ctrlToshl
    .list('/entries/locations', { per_page: 10 })
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
