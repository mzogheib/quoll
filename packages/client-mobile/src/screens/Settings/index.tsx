import React from "react";
import { Text, View } from "react-native";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";

const SettingsScreen = (_: ScreenProps<"settings">) => {
  return (
    <ScreenTemplate>
      <Text>Settings Screen</Text>
    </ScreenTemplate>
  );
};

export default SettingsScreen;
