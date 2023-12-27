import React from "react";
import { Text } from "react-native";

import { ScreenProps } from "./types";
import ScreenTemplate from "./ScreenTemplate";
import { Map } from "../Map";

const HomeScreen = (_: ScreenProps<"home">) => {
  return (
    <ScreenTemplate>
      <Map />
    </ScreenTemplate>
  );
};

export default HomeScreen;
