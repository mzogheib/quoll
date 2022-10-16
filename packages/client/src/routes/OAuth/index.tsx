import { useHistory, useLocation } from 'react-router-dom'

import { onOAuthResponse } from '../../services/oauth'

const OAuth = () => {
  const history = useHistory()
  const location = useLocation()

  const searchString = location.search
  // searchString: ?foo=bar
  const searchParams = new URLSearchParams(searchString)
  const searchParamsObj = Object.fromEntries(searchParams)

  // Pass through any error messages to the settings page, which is where
  // the user would have started to get here
  onOAuthResponse(searchParamsObj, (errorMessage) =>
    history.push('/settings', { errorMessage })
  )

  return <div>Connecting...</div>
}

export default OAuth
