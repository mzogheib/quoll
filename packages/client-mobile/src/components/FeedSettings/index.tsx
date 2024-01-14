import { Button, Text, View } from "react-native";

import styles from "./styles";
import { ReactNode } from "react";

type Props = {
  title: string;
  url?: string;
  isConnected: boolean;
  imageConnected: ReactNode;
  imageDisconnected: ReactNode;
  onConnect: () => void;
  onDisconnect: () => void;
};

const FeedSettings = ({
  title,
  isConnected,
  imageConnected,
  imageDisconnected,
  onConnect,
  onDisconnect,
}: Props) => {
  const buttonLabel = isConnected ? "Disconnect" : "Connect";
  const onClick = isConnected ? onDisconnect : onConnect;
  const image = isConnected ? imageConnected : imageDisconnected;

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View>{image}</View>
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
