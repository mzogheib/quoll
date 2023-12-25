import { Button, Modal, Text, View } from "react-native";

import styles from "./styles";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConnect: () => void;
}

const WelcomeModal = ({ isOpen, onCancel, onConnect }: Props) => (
  <Modal transparent={true} visible={isOpen} onRequestClose={onCancel}>
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text>Quoll</Text>
        <Text>Map ya life!</Text>
        <Button onPress={onConnect} title="Connect Feeds" />
      </View>
    </View>
  </Modal>
);

export default WelcomeModal;
