import React from 'react'
import styled from 'styled-components'
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
  <Table>
    <thead>
      <tr>
        <th>Icon</th>
        <th>Component</th>
      </tr>
    </thead>
    <tbody>
      {iconNames.map((iconName) => {
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
)
