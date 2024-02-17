import React from "react";
import { View } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";

import TouchableIcon from "@components/TouchableIcon";
import { useNavigate, useNavigationStore } from "@screens/navigation";
import { screenConfigMap } from "@screens/config";
import { ScreenName } from "@screens/config";

import styles from "./styles";

type Props = {
  name: ScreenName;
  focusHighlightAxis?: "vertical" | "horizontal";
};

const GoToScreenButton = ({ name, focusHighlightAxis = "vertical" }: Props) => {
  const navigate = useNavigate();
  const { state } = useNavigationStore();

  const isFocussed = name === state.currentRouteName;

  const handlePress = () => {
    if (name === "home") navigate(name);
    else if (name === "settings") navigate(name);
  };

  const icon = (
    <TouchableIcon
      hitBox="max"
      onPress={handlePress}
      disabled={isFocussed}
      name={screenConfigMap[name].icon}
      color={colorPalette.mediumAquamarine}
      size={40}
    />
  );

  if (isFocussed) {
    const wrapperStyle =
      focusHighlightAxis === "vertical"
        ? styles.wrapperVFocussed
        : styles.wrapperHFocussed;

    return <View style={wrapperStyle}>{icon}</View>;
  }

  return icon;
};

export default GoToScreenButton;
