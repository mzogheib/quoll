import React from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'

import { onOAuthResponse } from '../../services/oauth'

const OAuth = ({ location, history }) => {
  const searchString = location.search
  // searchString: ?foo=bar
  const queryParams = querystring.parse(searchString.substr(1))

  // Pass through any error messages to the settings page, which is where
  // the user would have started to get here
  onOAuthResponse(queryParams, errorMessage =>
    history.push('/settings', { errorMessage })
  )

  return <div>Connecting...</div>
}

OAuth.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

export default OAuth
