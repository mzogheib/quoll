import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const Box = styled.div(
  ({ m = 0, mx = 0, my = 0, mt = 0, mr = 0, mb = 0, ml = 0 }) => {
    let marginT = mt
    let marginR = mr
    let marginB = mb
    let marginL = ml

    if (my) {
      marginT = my
      marginB = my
    }

    if (mx) {
      marginT = mx
      marginB = mx
    }

    if (m) {
      return css`
        margin: ${m}px;
      `
    }

    return css`
      margin: ${marginT}px ${marginR}px ${marginB}px ${marginL}px;
    `
  }
)

Box.propTypes = {
  mt: PropTypes.number,
  mr: PropTypes.number,
  mb: PropTypes.number,
  ml: PropTypes.number,
  mx: PropTypes.number,
  my: PropTypes.number,
  m: PropTypes.number,
}

export default Box
