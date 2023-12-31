import React, { ComponentProps } from "react";
import { TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type OwnProps = {
  onPress: () => void;
  disabled?: boolean;
};

type IconProps = ComponentProps<typeof Icon>;

type Props = OwnProps & IconProps;

const TouchableIcon = ({ onPress, disabled, name, size = 30 }: Props) => {
  return (
    <TouchableHighlight onPress={onPress} disabled={disabled}>
      <Icon name={name} size={size} />
    </TouchableHighlight>
  );
};

export default TouchableIcon;
