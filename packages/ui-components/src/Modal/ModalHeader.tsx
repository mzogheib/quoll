import React, { ReactNode } from "react";
import styled from "styled-components";

import { IconButton } from "../IconButton";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Must have at least one prop
type Props =
  | {
      children: ReactNode;
      onClose: () => void;
    }
  | {
      children: ReactNode;
    }
  | {
      onClose: () => void;
    };

export const ModalHeader = (props: Props) => {
  const children = "children" in props ? props.children : null;
  const onClose = "onClose" in props ? props.onClose : null;

  return (
    <Wrapper>
      {children}
      <div />
      {onClose && <IconButton icon="Close" size={30} onClick={onClose} />}
    </Wrapper>
  );
};
