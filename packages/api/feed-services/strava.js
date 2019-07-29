const moment = require('moment')
const apiStrava = require('../feed-apis').strava

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getAthleteActivities,
}

function getOAuthUrl() {
  return apiStrava.oauth.url()
}

function authenticate(code) {
  return apiStrava.oauth.token({ code })
}

function refreshAuth(auth) {
  return Promise.resolve(auth)
}

function deauthorize({ access_token }) {
  return apiStrava.oauth.deauthorize({ access_token })
}

function getAthleteActivities(from, to, token) {
  const after = moment(from).unix() - 1
  const before = moment(to).unix() + 1
  const perPage = 20

  return apiStrava.athlete.activities
    .list({ after, before, per_page: perPage, access_token: token })
    .then(activities => {
      const promises = activities.map(activity => {
        return apiStrava.activities.get({
          id: activity.id,
          access_token: token,
        })
      })

      return Promise.all(promises)
    })
}

const getLocalTimestamp = d => {
  return Math.round(d.getTime() / 1000) + d.getTimezoneOffset() * 60
}
