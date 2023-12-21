import React from "react";
import { Button } from "react-native";
import { ScreenProps } from "./types";

type Props = ScreenProps<"Settings">;

const SettingsScreen = ({ navigation }: Props) => {
  return (
    <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
  );
};

export default SettingsScreen;
