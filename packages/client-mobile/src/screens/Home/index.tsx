import React, { useEffect } from "react";
import { View } from "react-native";
import { Map } from "@modules/map/ui/Map";
import { DateBar } from "@modules/date-bar/ui/DateBar";

import { useStyles } from "./styles";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";
import { useMedia } from "@modules/media/logic";

const HomeScreen = (_: ScreenProps<"home">) => {
  const styles = useStyles();
  const { value, isConnected, isCheckingPermission, refresh } = useMedia();

  useEffect(() => {
    if (isCheckingPermission) return;

    if (isConnected) refresh();
  }, [isConnected, refresh]);

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
