// This is probably trying to be more clever than it's worth but it removes a lot of boilerplate
const apis = ['moves', 'strava', 'toshl', 'uber']

module.exports = apis.reduce((exp, api) => {
  const lib = require(`node-${api}`)
  const auth = {
    redirect_uri: 'http://localhost:3000/oauth',
    ...require(`./private/${api}-auth`),
  }
  return {
    [api]: new lib(auth),
    ...exp,
  }
}, {})
