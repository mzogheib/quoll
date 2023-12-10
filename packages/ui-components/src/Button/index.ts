import styled, { css } from "styled-components";
import { lighten, darken } from "polished";

type MakeStyleParams = {
  fontFamily: string;
  fontColor: string;
  backgroundColor: string;
  bold?: boolean;
  disabled?: boolean;
  noHitbox?: boolean;
};
const makeStyle = ({
  fontFamily,
  fontColor,
  backgroundColor,
  bold,
  disabled,
  noHitbox,
}: MakeStyleParams) => css`
  border: none;
  border-radius: 4px;

  font-family: ${fontFamily};
  font-size: 14px;
  font-weight: ${bold ? 500 : null};

  height: ${noHitbox ? "unset" : "36px"};
  min-width: ${noHitbox ? "unset" : "120px"};
  padding: ${noHitbox ? 0 : "0 15px"};

  background-color: ${disabled
    ? lighten(0.1, backgroundColor)
    : backgroundColor};
  color: ${disabled ? lighten(0.4, fontColor) : fontColor};
  cursor: ${disabled ? "unset" : "pointer"};

  &:hover {
    background-color: ${!disabled && darken(0.05, backgroundColor)};
  }
`;

export const Button = styled.button(({ theme: { colors, font }, disabled }) =>
  makeStyle({
    fontFamily: font.family,
    fontColor: font.color,
    backgroundColor: colors.whiteSmoke,
    disabled,
  })
);

export const ButtonPrimary = styled.button(
  ({ theme: { colors, font }, disabled }) =>
    makeStyle({
      fontFamily: font.family,
      fontColor: font.color,
      backgroundColor: colors.mediumAquamarine,
      disabled,
    })
);

export const ButtonPlain = styled.button(
  ({ theme: { colors, font }, disabled }) =>
    makeStyle({
      fontFamily: font.family,
      fontColor: font.color,
      backgroundColor: colors.transparent,
      bold: true,
      disabled,
      noHitbox: true,
    })
);
