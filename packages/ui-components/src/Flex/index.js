import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import Box from '../Box'

const Flex = styled(Box)(({ direction, justifyContent, alignItems }) => {
  return css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
  `
})

Flex.propTypes = {
  direction: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
}

export default Flex
