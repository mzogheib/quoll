import React from 'react'
import styled from 'styled-components'
import { sortBy } from 'lodash'

import IconButton from '.'

export default { title: 'IconButton' }

const Table = styled.table`
  th,
  td {
    min-width: 150px;
    text-align: center;
  }
`

const iconNames = sortBy(Object.keys(IconButton))

const handleClick = buttonVariation =>
  alert(`Clicked on ${buttonVariation} IconButton!`)

export const Default = () => (
  <Table>
    <thead>
      <tr>
        <th>IconButton</th>
        <th>Component</th>
      </tr>
    </thead>
    <tbody>
      {iconNames.map(iconName => {
        const IconComponent = IconButton[iconName]
        return (
          <tr key={iconName}>
            <td>
              <IconComponent onClick={() => handleClick(iconName)} />
            </td>
            <td>
              <code>{`<IconButton.${iconName} onClick={handleClick} />`}</code>
            </td>
          </tr>
        )
      })}
    </tbody>
  </Table>
)
