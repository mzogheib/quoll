const apiToshl = require('../feed-apis').toshl
const ToshlUser = require('../models/toshlUser.model')

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getEntries,
}

function getOAuthUrl() {
  return apiToshl.oauth.url()
}

function authenticate(code) {
  return apiToshl.oauth.token({ code }).then(data => {
    const expiry_time = calculateExpiryTime(data.expires_in)
    return { expiry_time, ...data }
  })
}

function deauthorize(auth) {
  return apiToshl.oauth.deauthorize({ ...auth }).then(() => {
    ToshlUser.deleteOne({ accessToken: auth.access_token }, error => {
      // TODO: handle errors
    })
  })
}

function refreshAuth(auth) {
  return apiToshl.oauth.refresh({ ...auth }).then(data => {
    // Clear cache identified by old access_token
    ToshlUser.deleteOne({ accessToken: auth.access_token }, error => {
      // TODO: handle errors
    })
    const expiry_time = calculateExpiryTime(data.expires_in)
    return { expiry_time, ...data }
  })
}

function getTags(accessToken) {
  return new Promise((resolve, reject) => {
    ToshlUser.findOne({ accessToken }, (error, toshlUser) => {
      if (error) return reject(error)
      if (toshlUser && toshlUser.tags) return resolve(toshlUser.tags)
      return apiToshl.tags.list({ access_token: accessToken }).then(tags => {
        ToshlUser.create(
          {
            accessToken,
            tags: tags.reduce(
              (prev, tag) => ({
                [tag.id]: tag.name,
                ...prev,
              }),
              {}
            ),
          },
          (error, toshlUser) => {
            if (error) return reject(error)
            return resolve(toshlUser.tags)
          }
        )
      })
    })
  })
}

function getEntries(from, to, token) {
  var decoratedEntries
  return apiToshl.entries
    .list({ from, to, access_token: token })
    .then(entries => {
      decoratedEntries = entries
    })
    .then(() => getTags(token))
    .then(tags => {
      decoratedEntries.forEach(decoratedEntry => {
        decoratedEntry.tags = decoratedEntry.tags.map(tagId => {
          return { id: tagId, name: tags[tagId] || 'No tag' }
        })
      })
      return decoratedEntries
    })
}

function calculateExpiryTime(expiresIn) {
  // Substract a small amount to account for lag
  return Math.floor(Date.now() / 1000 + (expiresIn || 3600) - 300)
}
