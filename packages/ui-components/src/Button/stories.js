import React from 'react'
import styled from 'styled-components'

import Button from '.'
import Flex from '../Flex'

export default { title: 'Button' }

const ButtonWrapper = styled.div`
  padding: 20px;
`

const handleClick = buttonVariation =>
  alert(`Clicked on ${buttonVariation} Button!`)

const buttonVariations = [null, 'Primary', 'Plain']
const buttonDisabledProp = [false, true]

const renderButton = ({ variation, disabled }) => {
  const ButtonComponent = variation ? Button[variation] : Button
  const variationLabel = variation || 'Default'
  return (
    <ButtonWrapper key={`${variationLabel}-${disabled}`}>
      <ButtonComponent
        disabled={disabled}
        onClick={() => handleClick(variationLabel)}
      >
        {variationLabel} Button
      </ButtonComponent>
    </ButtonWrapper>
  )
}

export const Default = () => (
  <Flex>
    {buttonDisabledProp.map(disabled => (
      <Flex key={disabled} direction="column" alignItems="center">
        <div>{disabled ? 'Disabled' : 'Enabled'}</div>
        {buttonVariations.map(variation =>
          renderButton({ variation, disabled })
        )}
      </Flex>
    ))}
  </Flex>
)
