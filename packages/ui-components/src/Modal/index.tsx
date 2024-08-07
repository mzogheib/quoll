import React from "react";
import styled, { css } from "styled-components";
import ReactModal from "react-modal";

import { ModalInner } from "./ModalInner";
import { ModalHeader } from "./ModalHeader";
import { ModalActions } from "./ModalActions";

// Inspired by https://github.com/reactjs/react-modal/issues/603

const ReactModalAdapter = ({ className, ...props }: ReactModal.Props) => (
  <ReactModal
    className={className}
    overlayClassName={`${className}__overlay`}
    bodyOpenClassName={`${className}__body-open`}
    {...props}
  />
);

ReactModalAdapter.setAppElement = (id: string) => ReactModal.setAppElement(id);

type IReactModalAdapter = typeof ReactModalAdapter;

interface IModal extends IReactModalAdapter {
  Header: typeof ModalHeader;
  Inner: typeof ModalInner;
  Actions: typeof ModalActions;
}

export const Modal: IModal = styled(ReactModalAdapter)(
  ({ theme: { colors } }) => css`
    width: 100%;
    max-width: 400px;
    background-color: ${colors.white};
    outline: none;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    &__overlay {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background-color: rgba(196, 196, 196, 0.5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }

    /* No scroll on mobile Safari as per https://github.com/reactjs/react-modal/issues/191#issuecomment-302172285 */
    &__body-open {
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
    }
  `,
);

Modal.Inner = ModalInner;
Modal.Header = ModalHeader;
Modal.Actions = ModalActions;
