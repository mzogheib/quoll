import React, { Fragment } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { QuollUIThemeProvider } from '@quoll/ui-components'
import themes from '@quoll/ui-themes'
import 'typeface-pacifico'

import App from '../App'
import store from '../store'
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
        <QuollUIThemeProvider theme={themes.default}>
          <Fragment>
            <App />
            <GlobalStyle />
          </Fragment>
        </QuollUIThemeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)

export default AppRoot
