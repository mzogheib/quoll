import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import 'typeface-pacifico'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import store from './store'
import themes from './themes'

render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={themes.default}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
