import React from "react";
import { TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
  onPress: () => void;
};

const HelpButton = ({ onPress }: Props) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Icon name="help" size={30} />
    </TouchableHighlight>
  );
};

export default HelpButton;
