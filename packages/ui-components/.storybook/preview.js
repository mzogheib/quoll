import { ThemeProvider } from 'styled-components'
import themes from '@quoll/ui-themes'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={themes.default}>
      <Story />
    </ThemeProvider>
  ),
]

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
}
