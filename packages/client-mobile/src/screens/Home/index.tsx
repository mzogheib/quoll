import React from "react";
import { View } from "react-native";

import { useStyles } from "./styles";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";
import { Map } from "../../Map";
import { DateBar } from "../../date-bar";

const HomeScreen = (_: ScreenProps<"home">) => {
  const styles = useStyles();

  return (
    <ScreenTemplate>
      <View style={styles.wrapper}>
        <View style={styles.map}>
          <Map />
        </View>
        <View style={styles.sideBar}>
          <DateBar onDateChange={() => {}} />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default HomeScreen;
