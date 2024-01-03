import React, { ComponentProps } from "react";
import { TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";

type OwnProps = {
  onPress: () => void;
  disabled?: boolean;
  hitBox?: "min" | "max";
};

type IconProps = ComponentProps<typeof Icon>;

type Props = OwnProps & IconProps;

const TouchableIcon = ({
  onPress,
  disabled,
  hitBox = "min",
  name,
  size = 30,
  ...iconProps
}: Props) => {
  const wrapperStyle = hitBox === "max" ? styles.wrapperMax : undefined;

  return (
    <TouchableHighlight
      style={wrapperStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <Icon name={name} size={size} {...iconProps} />
    </TouchableHighlight>
  );
};

export default TouchableIcon;
