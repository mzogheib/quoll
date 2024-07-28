import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

const alignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
} as const;

type Align = keyof typeof alignMap;

const directionMap = {
  row: "row",
  "row-reverse": "row-reverse",
  column: "column",
  "column-reverse": "column-reverse",
} as const;

type Direction = keyof typeof directionMap;

type DivProps = HTMLAttributes<HTMLDivElement>;

type OwnProps = {
  /** Flex alignment for the children */
  align?: Align;
  /** Flex direction for the children */
  direction?: Direction;
};

type Props = OwnProps & DivProps;

const _ModalActions = styled.div<{ $align: Align; $direction: Direction }>(
  ({ $align, $direction }) => css`
    display: flex;
    flex-direction: ${directionMap[$direction]};
    justify-content: ${alignMap[$align]};
    gap: 10px;
    margin-top: 15px;
  `,
);

export const ModalActions = ({
  align = "end",
  direction = "row",
  ...rest
}: Props) => <_ModalActions $align={align} $direction={direction} {...rest} />;
