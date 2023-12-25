import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

import { useIsNarrow } from "../../dimensions";
import GoToScreenButton from "./GoToScreenButton";
import HelpButton from "./HelpButton";

type Props = {
  onHelpClick: () => void;
};

const NavBar = ({ onHelpClick }: Props) => {
  const isNarrow = useIsNarrow();

  if (isNarrow) {
    return (
      <View style={styles.wrapperH}>
        <HelpButton onPress={onHelpClick} />
        <GoToScreenButton name="home" />
        <GoToScreenButton name="settings" />
      </View>
    );
  }

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
};

export default NavBar;
