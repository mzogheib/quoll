import React from 'react'
import { ThemeProvider } from 'styled-components'
import { configure, addDecorator } from '@storybook/react'
import themes from '@quoll/ui-themes'

configure(require.context('../src', true, /stories\.js$/), module)

addDecorator(story => (
  <ThemeProvider theme={themes.default}>{story()}</ThemeProvider>
))
