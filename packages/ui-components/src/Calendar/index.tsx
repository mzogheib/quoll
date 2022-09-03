import styled, { css } from 'styled-components'
import Calendar from 'react-calendar'

export default styled(Calendar)(
  ({ theme: { font } }) => css`
    &.react-calendar {
      border: none;
      max-width: 300px;

      * {
        font-family: ${font.family};
      }
    }
  `
)
