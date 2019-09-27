// TODO: there has to be a better way than this to export these components

import { ThemeProvider } from 'styled-components'

import button from './src/Button'
import icon from './src/Icon'
import iconButton from './src/Icon'

export const QuollUIThemeProvider = ThemeProvider

export const Button = button
export const Icon = icon
export const IconButton = iconButton
