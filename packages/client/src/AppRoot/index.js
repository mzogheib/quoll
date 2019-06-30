import React, { Fragment } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'typeface-pacifico'

import App from '../App'
import store from '../store'
import themes from '../themes'
import 'typeface-pacifico'

const GlobalStyle = createGlobalStyle`
  html,
  body,
  .rootdiv {
    height: 100%;
  }
   body {
    margin: 0;
    padding: 0;
    font-family: Roboto, sans-serif;
  }
   * {
    box-sizing: border-box;
  }
`

const AppRoot = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={themes.default}>
        <Fragment>
          <App />
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)

export default AppRoot
