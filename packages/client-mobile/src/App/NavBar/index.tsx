import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

import { useScreenWidth } from "../../dimensions";
import GoToScreenButton from "./GoToScreenButton";
import HelpButton from "./HelpButton";

type Props = {
  onHelpClick: () => void;
};

const NavBar = ({ onHelpClick }: Props) => {
  const screenWidth = useScreenWidth();

  if (["md", "lg", "xl"].includes(screenWidth)) {
    return (
      <View style={styles.wrapperV}>
        <View>
          <Text>Quoll</Text>
          <GoToScreenButton name="home" />
        </View>
        <View>
          <GoToScreenButton name="settings" />
          <HelpButton onPress={onHelpClick} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapperH}>
      <HelpButton onPress={onHelpClick} />
      <GoToScreenButton name="home" />
      <GoToScreenButton name="settings" />
    </View>
  );
};

export default NavBar;
