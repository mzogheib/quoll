import React from "react";
import { ScrollView, View } from "react-native";

import { useStyles } from "./styles";

import { Map } from "@components/Map";
import { DateBar } from "@modules/date/ui/DateBar";
import Timeline from "@modules/timeline/views/Timeline";
import { ScreenProps } from "../../config";
import ScreenTemplate from "../../ScreenTemplate";
import useController from "./controller";

const HomeScreen = ({ route }: ScreenProps<"home">) => {
  const styles = useStyles();

  const { entries, markers, date, handleDateChange } = useController();

  const handleEntryPress = (id: string) => {
    console.log(entries.find((entry) => entry.id === id));
  };

  return (
    <ScreenTemplate screenName={route.name}>
      <View style={styles.wrapper}>
        <View style={styles.map}>
          <Map markers={markers} />
        </View>
        <View style={styles.sideBar}>
          <DateBar date={new Date(date)} onDateChange={handleDateChange} />
          <ScrollView style={styles.timeline}>
            <Timeline entries={entries} onEntryPress={handleEntryPress} />
          </ScrollView>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default HomeScreen;
