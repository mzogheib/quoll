import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Home from './component.js'

const renderer = new ShallowRenderer()

it('renders without crashing', () => {
  const div = document.createElement('div')
  renderer.render(<Home />, div)
})
