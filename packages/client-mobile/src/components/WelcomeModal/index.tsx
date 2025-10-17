import React from "react";
import { Text, View } from "react-native";
import Logo from "@components/Logo";

import styles from "./styles";

import WelcomeModalActions from "./WelcomeModalActions";
import { Modal } from "../../ui-components/Modal";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConnect: () => void;
}

const WelcomeModal = ({ isOpen, onCancel, onConnect }: Props) => (
  <Modal isOpen={isOpen} onRequestClose={onCancel}>
    <Modal.Inner>
      <Modal.Header onClose={onCancel} />
      <View style={styles.title}>
        <Logo size={48} color="black" />
      </View>
      <View style={styles.message}>
        <Text>Map ya life!</Text>
      </View>
      <WelcomeModalActions onConnectFeeds={onConnect} />
    </Modal.Inner>
  </Modal>
);

export default WelcomeModal;
