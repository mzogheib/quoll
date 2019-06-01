import styled from 'styled-components'
import { alignItems, justifyContent, flexDirection } from 'styled-system'

import Box from '../Box'

const Flex = {
  ...styled(Box)`
    display: flex;
    ${alignItems};
    ${justifyContent};
    ${flexDirection};
  `,
  displayName: 'Flex',
}

export default Flex
