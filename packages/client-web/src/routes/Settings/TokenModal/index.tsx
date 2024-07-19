import { useState } from "react";
import { ButtonPrimary, Modal } from "@quoll/ui-components";
import { Input } from "@quoll/ui-components";

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
      <Modal.Inner>
        <Modal.Header onClose={onCancel} />
        <Input
          value={value}
          onChange={setValue}
          placeholder="Enter your personal access token"
        />
        <Modal.Actions>
          <ButtonPrimary onClick={handleSubmit}>Submit</ButtonPrimary>
        </Modal.Actions>
      </Modal.Inner>
    </Modal>
  );
};

export default TokenModal;
