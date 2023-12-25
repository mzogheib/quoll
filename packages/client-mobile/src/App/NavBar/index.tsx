import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

import { useIsNarrow } from "../../dimensions";
import GoToScreenButton from "./GoToScreenButton";

const NavBar = () => {
  const isNarrow = useIsNarrow();

  if (isNarrow) {
    return (
      <View style={styles.wrapperH}>
        <GoToScreenButton name="home" />
        <GoToScreenButton name="settings" />
      </View>
    );
  }

  return (
    <View style={styles.wrapperV}>
      <GoToScreenButton name="home" />
      <GoToScreenButton name="settings" />
    </View>
  );
};

export default NavBar;
