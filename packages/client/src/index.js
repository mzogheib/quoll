import React from 'react'
import ReactDOM from 'react-dom'

import AppRoot from './AppRoot'

const render = () => {
  ReactDOM.render(<AppRoot />, document.getElementById('root'))
}

render()

if (module.hot) module.hot.accept('./AppRoot', () => render())
