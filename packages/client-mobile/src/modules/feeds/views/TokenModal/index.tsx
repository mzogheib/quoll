import React, { useState } from "react";
import { Modal, View, TextInput } from "react-native";

import styles from "./styles";
import { Button } from "../../../../ui-components/Button";

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
    <Modal
      transparent={true}
      visible={isOpen}
      onRequestClose={onCancel}
      supportedOrientations={["portrait", "landscape"]}
    >
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <View style={styles.message}>
            <TextInput
              placeholder="Enter your personal access token"
              value={value}
              onChange={(e) => setValue(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.actions}>
            <Button onPress={onCancel} title="Cancel" />
            <Button variant="primary" onPress={handleSubmit} title="Submit" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TokenModal;
