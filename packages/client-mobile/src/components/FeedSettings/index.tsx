import { Button, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colorPalette } from "@quoll/ui-primitives";

import styles from "./styles";

type Props = {
  title: string;
  url?: string;
  onConnect: () => void;
};

const FeedSettings = ({ title, url, onConnect }: Props) => {
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
          <Button title="Connect" onPress={onConnect} />
        </View>
      </View>
    </View>
  );
};

export default FeedSettings;
