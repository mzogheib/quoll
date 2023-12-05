import utils from '../utils'
import storageService from '../storage'

// OAuth Flow
// 1. User clicks 'connect' on the settings page and BE returns a url for that feed
// 2. requestAuth is then called and does the following:
//    - Stores a local token and attaches it to a state variable on the url from the BE
//    - Opens a new window at this new url with state variable
//    - Registers a callback on the current window that will be called after the user has accepted/rejected the auth request in the new window
// 3. User accepts/rejects the auth request in the new window
// 4. New window is directed back to this app to /oauth
// 5. The component at that route calls onOAuthResponse with the response
// 6. If all is well the callback on the original window is called and the new window closes itself
// 7. That callback then does the response/state/token validation etc

const makeToken = () => {
  const token = utils.makeRandomString(10)
  storageService.set('oauth-state-token', token)
  return token
}

const getTokenFromState = (state: string) => {
  const { token } = utils.decode(state)
  return token
}

const isValidToken = (token: string) => {
  const storedToken = storageService.get('oauth-state-token')
  storageService.delete('oauth-state-token')
  return storedToken && token && storedToken === token
}

const makeAuthUrl = (url: string) => {
  const state = utils.encode({ token: makeToken() })
  const newUrl = new URL(url)
  newUrl.searchParams.append('state', state)
  return newUrl.toString()
}

interface OAuthResponse {
  code?: string
  state?: string
  error?: string
}

type OnSuccess = (code: string) => void

type OnError = (error: string) => void

type QuollOnOAuthResponse = (response?: OAuthResponse) => void

declare global {
  interface Window {
    quollOnOAuthResponse: QuollOnOAuthResponse
  }
}

// This is called by the OPENER
export const requestAuth = (
  url: string,
  onSuccess: OnSuccess,
  onError: OnError
) => {
  window.open(makeAuthUrl(url))

  // Register the callback that the OPENED window will call
  window.quollOnOAuthResponse = (response) => {
    if (!(response && response.state)) return onError('Unknown response.')

    const { code, state, error } = response
    let token

    try {
      token = getTokenFromState(state)
    } catch {
      storageService.delete('oauth-state-token')
      return onError('Could not authenticate feed. Try again.')
    }

    if (!code || !isValidToken(token) || error === 'access_denied')
      return onError('Access denied.')

    onSuccess(code)
  }
}

// This is called by the OPENED
export const onOAuthResponse = (response: OAuthResponse, onError: OnError) => {
  // Perhaps the opener was closed for some reason
  if (!window.opener) {
    storageService.delete('oauth-state-token')
    onError('Could not authenticate feed. Try again.')
    return
  }

  // This is an edge case. Fail silently until there's a need for a better solution
  if (!window.opener.quollOnOAuthResponse) {
    storageService.delete('oauth-state-token')
    window.close()
    return
  }

  window.opener.quollOnOAuthResponse(response)
  delete window.opener.quollOnOAuthResponse
  window.close()
}
