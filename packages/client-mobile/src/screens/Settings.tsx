import React from "react";
import { Text, View } from "react-native";
import { ScreenProps } from "./types";

const SettingsScreen = (_: ScreenProps<"settings">) => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;
