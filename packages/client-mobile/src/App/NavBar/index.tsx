import React from "react";
import { View, Button } from "react-native";

import styles from "./styles";

import { useNavigate } from "../../screens/Screens";
import { screenConfigMap } from "../../screens/config";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.wrapper}>
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
