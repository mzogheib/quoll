// This is probably trying to be more clever than it's worth but it removes a lot of boilerplate
const apis = [
  {
    name: 'moves',
    auth: {
      client_id: process.env.MOVES_CLIENT_ID,
      client_secret: process.env.MOVES_CLIENT_SECRET,
    },
  },
  {
    name: 'strava',
    auth: {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
    },
  },
  {
    name: 'toshl',
    auth: {
      client_id: process.env.TOSHL_CLIENT_ID,
      client_secret: process.env.TOSHL_CLIENT_SECRET,
    },
  },
  {
    name: 'uber',
    auth: {
      client_id: process.env.UBER_CLIENT_ID,
      client_secret: process.env.UBER_CLIENT_SECRET,
    },
  },
]

module.exports = apis.reduce((exp, api) => {
  const lib = require(`node-${api.name}`)
  const auth = {
    redirect_uri: 'http://localhost:3000/oauth',
    ...api.auth,
  }
  return {
    [api.name]: new lib(auth),
    ...exp,
  }
}, {})
