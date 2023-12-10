import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  position: relative;
  height: 4px;
`;

const Pill = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    width: 10%;
    height: 100%;
    background-color: ${colors.mediumAquamarine};
    animation: 1s linear 0s slide infinite;

    @keyframes slide {
      from {
        left: 0;
      }
      to {
        left: 100%;
        width: 50%;
        transform: translateX(-100%);
      }
    }
  `,
);

export const HorizontalLoader = () => (
  <Wrapper>
    <Pill />
  </Wrapper>
);
