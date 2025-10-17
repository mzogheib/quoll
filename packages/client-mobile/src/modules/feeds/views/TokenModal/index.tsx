import React, { useState } from "react";

import { Button } from "../../../../ui-components/Button";
import { TextInput } from "../../../../ui-components/TextInput";
import { Modal } from "../../../../ui-components/Modal";

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
    <Modal isOpen={isOpen} onRequestClose={onCancel}>
      <Modal.Inner>
        <TextInput
          placeholder="Enter your personal access token"
          value={value}
          onChange={(e) => setValue(e.nativeEvent.text)}
        />
        <Modal.Actions>
          <Button onPress={onCancel} title="Cancel" />
          <Button variant="primary" onPress={handleSubmit} title="Submit" />
        </Modal.Actions>
      </Modal.Inner>
    </Modal>
  );
};

export default TokenModal;
