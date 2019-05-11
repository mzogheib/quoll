// This is called by the OPENER
export const requestAuth = (url, callback) => {
  window.open(url)
  // Register the callback that the OPENED window will call
  window.quollOnOAuthResponse = callback
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
