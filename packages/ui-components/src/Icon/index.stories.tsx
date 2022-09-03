import React from 'react'
import styled from 'styled-components'
import { sortBy } from 'lodash'

import Icon, { iconNames } from '.'

export default { title: 'Icon' }

const Table = styled.table`
  th,
  td {
    min-width: 150px;
    text-align: center;
  }
`

export const Default = () => (
  <Table>
    <thead>
      <tr>
        <th>Icon</th>
        <th>Component</th>
      </tr>
    </thead>
    <tbody>
      {sortBy(iconNames).map((iconName) => {
        return (
          <tr key={iconName}>
            <td>
              <Icon icon={iconName} />
            </td>
            <td>
              <code>{`<Icon icon="${iconName}" />`}</code>
            </td>
          </tr>
        )
      })}
    </tbody>
  </Table>
)
