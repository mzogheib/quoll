import styled from 'styled-components'
import Calendar from 'react-calendar'

export default styled(Calendar)`
  &.react-calendar {
    border: none;
    max-width: 300px;

    * {
      font-family: Roboto, sans-serif;
    }
  }
`
