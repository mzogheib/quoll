import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

const alignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
} as const;

type Align = keyof typeof alignMap;

type DivProps = HTMLAttributes<HTMLDivElement>;

type OwnProps = {
  align?: Align;
};

type Props = OwnProps & DivProps;

const _ModalActions = styled.div<{ $align: Align }>(
  ({ $align }) => css`
    display: flex;
    justify-content: ${alignMap[$align]};
    gap: 10px;
    margin-top: 10px;
  `,
);

export const ModalActions = ({ align = "end", ...rest }: Props) => (
  <_ModalActions $align={align} {...rest} />
);
