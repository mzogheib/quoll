import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import themes from '@quoll/ui-themes'
import { sortBy } from 'lodash'

import Icon from '.'

export default { title: 'Icon' }

const Table = styled.table`
  th,
  td {
    min-width: 150px;
    text-align: center;
  }
`

const iconNames = sortBy(Object.keys(Icon))

export const Default = () => (
  <ThemeProvider theme={themes.default}>
    <Table>
      <thead>
        <tr>
          <th>Icon</th>
          <th>Component</th>
        </tr>
      </thead>
      <tbody>
        {iconNames.map(iconName => {
          const IconComponent = Icon[iconName]
          return (
            <tr key={iconName}>
              <td>
                <IconComponent />
              </td>
              <td>
                <code>{`<Icon.${iconName} />`}</code>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  </ThemeProvider>
)
