import React from "react";
import { View } from "react-native";

import styles from "./styles";

import Logo from "@components/Logo";
import { useScreenWidth } from "@utils/dimensions/logic";
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
          <View style={styles.logo}>
            <Logo size={26} color="mediumAquamarine" />
          </View>

          <View style={styles.itemV}>
            <GoToScreenButton name="home" focusHighlightAxis="horizontal" />
          </View>
        </View>
        <View>
          <View style={styles.itemV}>
            <GoToScreenButton name="settings" focusHighlightAxis="horizontal" />
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
