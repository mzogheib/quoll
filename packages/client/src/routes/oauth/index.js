import React from 'react'
import querystring from 'querystring'

export default ({ location, history }) => {
  const searchString = location.search
  // searchString: ?foo=bar
  const queryParams = querystring.parse(searchString.substr(1))

  // Came here from an OAuth redirect
  if (window.opener && window.opener.quollOnOAuthSuccess) {
    window.opener.quollOnOAuthSuccess(queryParams)
    window.close()
    return <div>Connecting...</div>
  }

  // Came here manually?
  history.push('/settings')
  return <div>Redirecting...</div>
}
