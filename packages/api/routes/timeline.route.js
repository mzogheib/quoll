const ctrlUsers = require('../controllers/users.controller')
const ctrlTimeline = require('../controllers/timeline.controller')

module.exports = {
  get,
}

function get(req, res) {
  const { from, to } = req.query
  const { userId } = req

  const respond = ({ status, message }) => res.status(status).json(message)
  const onSuccess = (data) => respond({ status: 200, message: data })
  const onError = (error) =>
    respond({ status: error.status || 500, message: error.message })

  ctrlUsers
    .get(userId)
    .then((user) => ctrlTimeline.get(from, to, user))
    .then(onSuccess)
    .catch(onError)
}
