import React from "react";
import { View, Text } from "react-native";
import { useScreenWidth } from "@modules/dimensions/logic";

import styles from "./styles";

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
          <Text style={styles.logo}>Quoll</Text>
          <View style={styles.itemV}>
            <GoToScreenButton name="home" />
          </View>
        </View>
        <View>
          <View style={styles.itemV}>
            <GoToScreenButton name="settings" />
          </View>
          <View style={styles.itemV}>
            <HelpButton onPress={onHelpClick} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapperH}>
      <View style={styles.itemH}>
        <HelpButton onPress={onHelpClick} />
      </View>
      <View style={styles.itemH}>
        <GoToScreenButton name="home" />
      </View>
      <View style={styles.itemH}>
        <GoToScreenButton name="settings" />
      </View>
    </View>
  );
};

export default NavBar;
