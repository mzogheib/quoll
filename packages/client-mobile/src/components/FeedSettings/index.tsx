import { Button, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colorPalette } from "@quoll/ui-primitives";

import styles from "./styles";

type Props = {
  title: string;
  url?: string;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
};

const FeedSettings = ({
  title,
  isConnected,
  onConnect,
  onDisconnect,
}: Props) => {
  const buttonLabel = isConnected ? "Disconnect" : "Connect";
  const onClick = isConnected ? onDisconnect : onConnect;

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View>
          <Icon name="image" size={60} color={colorPalette.matterhorn} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.button}>
          <Button title={buttonLabel} onPress={onClick} />
        </View>
      </View>
    </View>
  );
};

export default FeedSettings;
