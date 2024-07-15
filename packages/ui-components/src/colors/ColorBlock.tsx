import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Color = styled.div<{ $colorValue: string }>(
  ({ $colorValue }) => css`
    width: 50px;
    height: 50px;
    background-color: ${$colorValue};
  `,
);

const Label = styled.div(
  ({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: 16px;
  `,
);

type Props = {
  colorName: string;
  colorValue: string;
};

const ColorBlock = ({ colorName, colorValue }: Props) => (
  <Wrapper>
    <Color $colorValue={colorValue} />
    &nbsp;
    <Label>{colorName}</Label>
  </Wrapper>
);

export default ColorBlock;
