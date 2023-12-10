import React from 'react';
import styled, { StyledComponent } from 'styled-components';

import { Button, ButtonPlain, ButtonPrimary } from '.';

export default { title: 'Button' };

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  padding: 20px;
`;

const handleClick = (buttonVariation?: string) =>
  alert(`Clicked on ${buttonVariation}!`);

const buttonVariations = [Button, ButtonPrimary, ButtonPlain];
const buttonDisabledProp = [false, true];

type RenderButtonParams = {
  variation: StyledComponent<'button', any>;
  disabled: boolean;
};
const renderButton = ({ variation, disabled }: RenderButtonParams) => {
  const ButtonComponent = variation;
  const variationLabel = ButtonComponent.displayName;
  return (
    <ButtonWrapper key={`${variationLabel}-${disabled}`}>
      <ButtonComponent
        disabled={disabled}
        onClick={() => handleClick(variationLabel)}
      >
        {variationLabel}
      </ButtonComponent>
    </ButtonWrapper>
  );
};

export const Default = () => (
  <Row>
    {buttonDisabledProp.map((disabled) => (
      <Column key={`${disabled}`}>
        <div>{disabled ? 'Disabled' : 'Enabled'}</div>
        {buttonVariations.map((variation) =>
          renderButton({ variation, disabled })
        )}
      </Column>
    ))}
  </Row>
);
