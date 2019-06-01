import styled from 'styled-components'
import { alignItems, justifyContent, flexDirection } from 'styled-system'

import Box from '../Box'

const Flex = Object.assign(
  styled(Box)`
    display: flex;
    ${alignItems};
    ${justifyContent};
    ${flexDirection};
  `,
  {
    displayName: 'Flex',
  }
)

export default Flex
