import React from "react";
import { ScrollView, View } from "react-native";

import { useStyles } from "./styles";

import { Map } from "@components/Map";
import EntryDetail from "@components/EntryDetail";
import { DateBar } from "@modules/date/ui/DateBar";
import Timeline from "@modules/timeline/views/Timeline";
import { ScreenProps } from "../../config";
import ScreenTemplate from "../../ScreenTemplate";
import useController from "./controller";

const HomeScreen = ({ route }: ScreenProps<"home">) => {
  const styles = useStyles();

  const {
    entries,
    selectedEntry,
    markers,
    date,
    handleEntrySelect,
    handleDateChange,
  } = useController();

  return (
    <ScreenTemplate screenName={route.name}>
      <View style={styles.wrapper}>
        <View style={styles.map}>
          <Map markers={markers} onMarkerPress={handleEntrySelect} />
          {selectedEntry && (
            <View style={styles.entryDetail}>
              <EntryDetail entry={selectedEntry} />
            </View>
          )}
        </View>
        <View style={styles.sideBar}>
          <DateBar date={new Date(date)} onDateChange={handleDateChange} />
          <ScrollView>
            {entries !== null && (
              <Timeline entries={entries} onEntryPress={handleEntrySelect} />
            )}
          </ScrollView>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default HomeScreen;
