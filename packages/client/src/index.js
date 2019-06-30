import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import AppRoot from './AppRoot'

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <AppRoot />
    </AppContainer>,
    document.getElementById('root')
  )
}

render()

if (module.hot) module.hot.accept('./AppRoot', () => render())
