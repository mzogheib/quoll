import React from "react";
import { Text } from "react-native";

import { ScreenProps } from "./types";
import ScreenTemplate from "./ScreenTemplate";

const HomeScreen = (_: ScreenProps<"home">) => {
  return (
    <ScreenTemplate>
      <Text>Home Screen</Text>
    </ScreenTemplate>
  );
};

export default HomeScreen;
