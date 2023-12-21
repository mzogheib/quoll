import React from "react";
import { View, Button } from "react-native";
import { ScreenProps } from "./types";

type Props = ScreenProps<"Home">;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

export default HomeScreen;
