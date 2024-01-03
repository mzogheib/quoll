import React from "react";
import { View } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";
import TouchableIcon from "@components/TouchableIcon";
import { useNavigate, useNavigationStore } from "@screens/navigation";
import { screenConfigMap } from "@screens/config";
import { ScreenName } from "@screens/types";

import styles from "./styles";

type Props = {
  name: ScreenName;
  focusHighlightAxis?: "vertical" | "horizontal";
};

const GoToScreenButton = ({ name, focusHighlightAxis = "vertical" }: Props) => {
  const navigate = useNavigate();
  const { currentRouteName } = useNavigationStore();

  const isFocussed = name === currentRouteName;

  const icon = (
    <TouchableIcon
      hitBox="max"
      onPress={() => navigate(name)}
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
