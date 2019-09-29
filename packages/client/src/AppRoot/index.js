import React, { Fragment } from 'react'
import { css, createGlobalStyle, ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import themes from '@quoll/ui-themes'
import 'typeface-pacifico'

import App from '../App'
import store from '../store'
import 'typeface-pacifico'

const GlobalStyle = createGlobalStyle(
  ({ theme: { font } }) => css`
    html,
    body,
    .rootdiv {
      height: 100%;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: ${font.family};
      color: ${font.color};
    }
    * {
      box-sizing: border-box;
    }
  `
)

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
