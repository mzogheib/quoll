import React from "react";
import { View, Button } from "react-native";

import styles from "./styles";

import { useNavigate } from "../../screens/navigation";
import { screenConfigMap } from "../../screens/config";
import { useDimensions } from "../../dimensions";

const NavBar = () => {
  const navigate = useNavigate();

  const { isNarrow } = useDimensions();

  const wrapperStyles = isNarrow ? styles.wrapperH : styles.wrapperV;

  return (
    <View style={wrapperStyles}>
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
