import React from "react";
import { View, Button } from "react-native";

import styles from "./styles";

import { useNavigate } from "../../screens/Screens";
import { screens } from "../../screens/Screens";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.wrapper}>
      {screens.map(({ name, title }) => (
        <Button key={name} onPress={() => navigate(name)} title={title} />
      ))}
    </View>
  );
};

export default NavBar;
