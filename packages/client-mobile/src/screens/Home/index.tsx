import React from "react";
import { View } from "react-native";

import { useStyles } from "./styles";

import { Map } from "@modules/map/ui/Map";
import { DateBar } from "@modules/date-bar/ui/DateBar";
import { ScreenProps } from "../config";
import ScreenTemplate from "../ScreenTemplate";
import useController from "./controller";

const HomeScreen = ({ route }: ScreenProps<"home">) => {
  const styles = useStyles();

  const { markers, date, handleDateChange } = useController();

  return (
    <ScreenTemplate screenName={route.name}>
      <View style={styles.wrapper}>
        <View style={styles.map}>
          <Map markers={markers} />
        </View>
        <View style={styles.sideBar}>
          <DateBar date={new Date(date)} onDateChange={handleDateChange} />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default HomeScreen;
