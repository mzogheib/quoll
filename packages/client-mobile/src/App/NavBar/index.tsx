import React from "react";
import { View, Button } from "react-native";

import styles from "./styles";

import { useNavigate } from "../../screens";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.wrapper}>
      <Button onPress={() => navigate("Home")} title="Home" />
      <Button onPress={() => navigate("Settings")} title="Settings" />
    </View>
  );
};

export default NavBar;
