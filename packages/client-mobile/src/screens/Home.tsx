import React from "react";
import { Text, View } from "react-native";
import { ScreenProps } from "./types";

const HomeScreen = (_: ScreenProps<"home">) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;
