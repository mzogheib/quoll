import React from 'react'
import styled from 'styled-components'

import HorizontalLoader from '.'

export default { title: 'Horizontal Loader' }

const Wrapper = styled.div`
  width: 200px;
`

export const Default = () => (
  <Wrapper>
    <HorizontalLoader />
    <div>Loading...</div>
  </Wrapper>
)
