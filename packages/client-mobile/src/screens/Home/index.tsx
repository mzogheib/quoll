import React from "react";
import { View } from "react-native";
import { Map } from "@modules/map/ui/Map";
import { DateBar } from "@modules/date-bar/ui/DateBar";

import { useStyles } from "./styles";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";

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
