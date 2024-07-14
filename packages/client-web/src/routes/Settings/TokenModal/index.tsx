import styled from "styled-components";
import { Button, IconButton, Modal } from "@quoll/ui-components";
import { Input } from "@quoll/ui-components";
import { useState } from "react";

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const InnerWrapper = styled.div`
  padding: 20px;
`;

const Actions = styled.div`
  margin: 30px 0 0;
  display: flex;
  justify-content: flex-end;
`;

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (value: string) => void;
}

const TokenModal = ({ isOpen, onCancel, onSubmit }: Props) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value === "") return;

    onSubmit(value);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel}>
      <Header>
        <IconButton icon="Close" size={30} onClick={onCancel} />
      </Header>
      <InnerWrapper>
        <Input
          value={value}
          onChange={setValue}
          placeholder="Enter your personal access token"
        />
        <Actions>
          <Button onClick={handleSubmit}>Submit</Button>
        </Actions>
      </InnerWrapper>
    </Modal>
  );
};

export default TokenModal;
