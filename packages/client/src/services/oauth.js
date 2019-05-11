import utils from './utils'
import storageService from './storage'

// This is called by the OPENER
export const requestAuth = ({ url, name }, callback) => {
  const token = utils.makeRandomString()
  storageService.set('oauth-state-token', token)
  const stateString = utils.encode({ name, token })
  const urlWithState = utils.addQueryParams(url, { state: stateString })
  window.open(urlWithState)

  // Register the callback that the OPENED window will call
  window.quollOnOAuthResponse = response => {
    if (!(response && response.state))
      return callback({ error: 'Unknown response.' })

    const oauthState = utils.decode(response.state)
    const oauthError = response.error
    const token = oauthState.token
    const storedToken = storageService.get('oauth-state-token')
    const tokenIsValid = storedToken && token && storedToken === token
    storageService.delete('oauth-state-token')
    if (!tokenIsValid || oauthError === 'access_denied')
      return callback({ error: 'Access denied.' })

    const oauthCode = response.code
    const dataSourceName = oauthState.name
    callback({ dataSourceName, oauthCode })
  }
}

// This is called by the OPENED
export const onOAuthResponse = (response, onError) => {
  try {
    window.opener.quollOnOAuthResponse(response)
    delete window.opener.quollOnOAuthResponse
    window.close()
  } catch (error) {
    onError()
  }
}
