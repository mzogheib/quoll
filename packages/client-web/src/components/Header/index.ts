import styled, { css } from "styled-components";

const Header = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40px;
    background-color: ${colors.matterhorn};
    color: ${colors.mediumAquamarine};
    font-size: 20px;
    font-weight: 500;
  `,
);

export default Header;
