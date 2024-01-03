import React from "react";
import { View } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";
import Logo from "@components/Logo";
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
          <View style={styles.logo}>
            <Logo size={26} color={colorPalette.mediumAquamarine} />
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
