import { useState } from "react";
import { Button, ButtonPrimary, Modal } from "@quoll/ui-components";
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
    setValue("");
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Inner>
        <Input
          value={value}
          onChange={setValue}
          placeholder="Enter your personal access token"
        />
        <Modal.Actions>
          <Button onClick={onCancel}>Cancel</Button>
          <ButtonPrimary onClick={handleSubmit}>Submit</ButtonPrimary>
        </Modal.Actions>
      </Modal.Inner>
    </Modal>
  );
};

export default TokenModal;
