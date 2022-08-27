import React, { useState } from 'react'
import styled from 'styled-components'

import Calendar from '.'

export default { title: 'Calendar' }

const Wrapper = styled.div`
  width: 200px;
`

export const Default = () => {
  const [date, setDate] = useState(null)
  return (
    <Wrapper>
      <Calendar maxDate={new Date()} value={date} onChange={setDate} />
      <code>{date && date.toISOString()}</code>
    </Wrapper>
  )
}
