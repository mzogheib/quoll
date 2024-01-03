import React from "react";
import { StyleSheet, View } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";
import TouchableIcon from "@components/TouchableIcon";
import { useNavigate, useNavigationStore } from "@screens/navigation";
import { screenConfigMap } from "@screens/config";
import { ScreenName } from "@screens/types";

import styles from "./styles";

type Props = {
  name: ScreenName;
  focusHighlightPosition?: "block-start" | "inline-end";
};

const GoToScreenButton = ({
  name,
  focusHighlightPosition = "block-start",
}: Props) => {
  const navigate = useNavigate();
  const { currentRouteName } = useNavigationStore();

  const isBlockStart = focusHighlightPosition === "block-start";
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
    const wrapperStyle = isBlockStart
      ? styles.wrapperBlockStartFocussed
      : styles.wrapperInlineEndFocussed;

    return <View style={wrapperStyle}>{icon}</View>;
  }

  return icon;
};

export default GoToScreenButton;
