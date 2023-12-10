import React from 'react';
import styled from 'styled-components';
import { sortBy } from 'lodash';

import { IconButton } from '.';
import { iconNames } from '../Icon';

export default { title: 'IconButton' };

const Table = styled.table`
  th,
  td {
    min-width: 150px;
    text-align: center;
  }
`;

const handleClick = (buttonVariation: string) =>
  alert(`Clicked on ${buttonVariation} IconButton!`);

export const Default = () => (
  <Table>
    <thead>
      <tr>
        <th>IconButton</th>
        <th>Component</th>
      </tr>
    </thead>
    <tbody>
      {sortBy(iconNames).map((iconName) => {
        return (
          <tr key={iconName}>
            <td>
              <IconButton
                icon={iconName}
                onClick={() => handleClick(iconName)}
              />
            </td>
            <td>
              <code>{`<IconButton icon="${iconName}" onClick={handleClick} />`}</code>
            </td>
          </tr>
        );
      })}
    </tbody>
  </Table>
);
