import React from 'react'
import styled from 'styled-components'
import themes from '@quoll/ui-themes'

import { QuollUIThemeProvider } from '../../index'
import Button from '.'

export default { title: 'Button' }

const Row = styled.div`
  display: flex;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

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

export const withText = () => (
  <QuollUIThemeProvider theme={themes.default}>
    <Row>
      {buttonDisabledProp.map(disabled => (
        <Column key={disabled}>
          <div>{disabled ? 'Disabled' : 'Enabled'}</div>
          {buttonVariations.map(variation =>
            renderButton({ variation, disabled })
          )}
        </Column>
      ))}
    </Row>
  </QuollUIThemeProvider>
)
