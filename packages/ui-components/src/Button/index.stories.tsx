import React from "react";
import styled from "styled-components";

import { Button, ButtonPlain, ButtonPrimary } from ".";

export default { title: "Button" };

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
  ButtonComponent: typeof Button | typeof ButtonPrimary | typeof ButtonPlain;
  disabled: boolean;
};

const renderButton = ({ ButtonComponent, disabled }: RenderButtonParams) => {
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
        <div>{disabled ? "Disabled" : "Enabled"}</div>
        {buttonVariations.map((ButtonComponent) =>
          renderButton({ ButtonComponent, disabled }),
        )}
      </Column>
    ))}
  </Row>
);
