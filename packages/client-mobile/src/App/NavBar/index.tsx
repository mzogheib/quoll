import React from "react";
import { View, Button, Text } from "react-native";

import styles from "./styles";

import { useNavigate } from "../../screens/navigation";
import { screenConfigMap } from "../../screens/config";
import { useIsNarrow } from "../../dimensions";

const NavBar = () => {
  const navigate = useNavigate();

  const isNarrow = useIsNarrow();

  const wrapperStyles = isNarrow ? styles.wrapperH : styles.wrapperV;

  return (
    <View style={wrapperStyles}>
      {!isNarrow && <Text>Quoll</Text>}
      <Button
        onPress={() => navigate("home")}
        title={screenConfigMap.home.title}
      />
      <Button
        onPress={() => navigate("settings")}
        title={screenConfigMap.settings.title}
      />
    </View>
  );
};

export default NavBar;
