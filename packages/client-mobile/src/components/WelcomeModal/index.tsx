import { Button, Modal, Text, View } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";
import Logo from "@components/Logo";

import styles from "./styles";
import TouchableIcon from "@components/TouchableIcon";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConnect: () => void;
}

const WelcomeModal = ({ isOpen, onCancel, onConnect }: Props) => (
  <Modal
    transparent={true}
    visible={isOpen}
    onRequestClose={onCancel}
    supportedOrientations={["portrait", "landscape"]}
  >
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableIcon name="close" onPress={onCancel} />
        </View>
        <View style={styles.title}>
          <Logo size={48} color="black" />
        </View>
        <View style={styles.message}>
          <Text>Map ya life!</Text>
        </View>
        <View style={styles.actions}>
          <Button onPress={onConnect} title="Connect Feeds" />
        </View>
      </View>
    </View>
  </Modal>
);

export default WelcomeModal;
