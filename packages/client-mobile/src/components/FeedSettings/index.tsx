import { Button, Text, View } from "react-native";

import styles from "./styles";
import { ReactNode } from "react";

type Props = {
  title: string;
  url?: string;
  connectLabel?: string;
  disconnectLabel?: string;
  isConnected: boolean;
  isConnecting: boolean;
  imageConnected: ReactNode;
  imageDisconnected: ReactNode;
  onConnect: () => void;
  onDisconnect: () => void;
};

const FeedSettings = ({
  title,
  connectLabel = "Connect",
  disconnectLabel = "Disconnect",
  isConnected,
  isConnecting,
  imageConnected,
  imageDisconnected,
  onConnect,
  onDisconnect,
}: Props) => {
  const buttonLabel = isConnected ? disconnectLabel : connectLabel;
  const onClick = isConnected ? onDisconnect : onConnect;
  const image = isConnected ? imageConnected : imageDisconnected;

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View style={styles.image}>{image}</View>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.button}>
          <Button
            title={buttonLabel}
            disabled={isConnecting}
            onPress={onClick}
          />
        </View>
      </View>
    </View>
  );
};

export default FeedSettings;
