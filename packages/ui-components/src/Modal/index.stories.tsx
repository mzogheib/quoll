import React, { useState } from "react";
import styled from "styled-components";

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

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Wrapper>
      <Button onClick={openModal}>Open</Button>

      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <Modal.Body>
          <div>
            This is a modal with actions. You can click also outside the modal
            to close it.
          </div>
          <Modal.Actions>
            <Button onClick={closeModal}>Cancel</Button>
            <ButtonPrimary onClick={closeModal}>Submit</ButtonPrimary>
          </Modal.Actions>
        </Modal.Body>
      </Modal>
    </Wrapper>
  );
};
