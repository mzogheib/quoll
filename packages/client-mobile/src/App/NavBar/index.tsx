import React from "react";
import { View, Text, Button } from "react-native";

import styles from "./styles";

import { useIsNarrow } from "../../dimensions";
import GoToScreenButton from "./GoToScreenButton";
import HelpButton from "./HelpButton";

const NavBar = () => {
  const isNarrow = useIsNarrow();

  if (isNarrow) {
    return (
      <View style={styles.wrapperH}>
        <HelpButton />
        <GoToScreenButton name="home" />
        <GoToScreenButton name="settings" />
      </View>
    );
  }

  return (
    <View style={styles.wrapperV}>
      <GoToScreenButton name="home" />
      <View>
        <GoToScreenButton name="settings" />
        <HelpButton />
      </View>
    </View>
  );
};

export default NavBar;
