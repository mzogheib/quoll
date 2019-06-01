import styled from 'styled-components'
import { space, minHeight, fontSize, fontWeight, color } from 'styled-system'

const Box = {
  ...styled.div(space, minHeight, fontSize, fontWeight, color),
  displayName: 'Box',
}

export default Box
