import React, { useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";

import { Button, ButtonPrimary } from "../Button";

import { Modal } from ".";

export default { title: "Modal" };

Modal.setAppElement("#modal-root");

const Wrapper = styled.div`
  width: 200px;

  > ${Button} {
    margin: 10px 0;
  }
`;

const DefaultModal = ({
  isOpen,
  onRequestClose,
  className,
}: ReactModal.Props) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={className}>
    <div>
      This is a modal. You can close it by pressing the escape key, clicking
      outside the modal or clicking on the button below.
    </div>
    <Button onClick={onRequestClose}>Close modal</Button>
  </Modal>
);

export const Default = () => {
  const [isDefaultModalOpen, setDefaultModalOpen] = useState(false);
  return (
    <Wrapper>
      <Button onClick={() => setDefaultModalOpen(true)}>Open modal</Button>

      <DefaultModal
        isOpen={isDefaultModalOpen}
        onRequestClose={() => setDefaultModalOpen(false)}
      />
    </Wrapper>
  );
};

export const WithActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Wrapper>
      <Button onClick={openModal}>Open modal</Button>

      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <Modal.Body>
          <div>This is a modal with actions.</div>
          <Modal.Actions>
            <Button onClick={closeModal}>Cancel</Button>
            <ButtonPrimary onClick={closeModal}>Submit</ButtonPrimary>
          </Modal.Actions>
        </Modal.Body>
      </Modal>
    </Wrapper>
  );
};
