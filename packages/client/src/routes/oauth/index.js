import React from 'react'
import querystring from 'querystring'
import { onOAuthResponse } from '../../services/oauth'

export default ({ location, history }) => {
  const searchString = location.search
  // searchString: ?foo=bar
  const queryParams = querystring.parse(searchString.substr(1))

  onOAuthResponse(queryParams, () => history.push('/settings'))

  return <div>Connecting...</div>
}
