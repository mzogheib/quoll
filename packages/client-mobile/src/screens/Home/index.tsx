import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";
import { Map } from "../../Map";
import { DateBar } from "../../date-bar";
import { useIsNarrow } from "../../dimensions";

const HomeScreen = (_: ScreenProps<"home">) => {
  const isNarrow = useIsNarrow();

  const wrapperStyles = isNarrow ? styles.wrapperNarrow : styles.wrapperWide;
  const mapStyles = styles.map;
  const sideBarStyles = isNarrow ? styles.sideBarNarrow : styles.sideBarWide;

  return (
    <ScreenTemplate>
      <View style={wrapperStyles}>
        <View style={mapStyles}>
          <Map />
        </View>
        <View style={sideBarStyles}>
          <DateBar onDateChange={() => {}} />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default HomeScreen;
