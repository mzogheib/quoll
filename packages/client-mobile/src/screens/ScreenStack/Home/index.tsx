import React from "react";
import { ScrollView, View, Pressable } from "react-native";

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
    handleEntryDeselect,
    handleDateChange,
  } = useController();

  const mapCenter = selectedEntry?.locationStart ?? undefined;

  return (
    <ScreenTemplate screenName={route.name}>
      <View style={styles.wrapper}>
        <View style={styles.map}>
          <Map
            center={mapCenter}
            markers={markers}
            onMarkerPress={handleEntrySelect}
          />
          {selectedEntry && (
            <Pressable style={styles.entryDetail} onPress={handleEntryDeselect}>
              <Pressable>
                <EntryDetail
                  entry={selectedEntry}
                  onClose={handleEntryDeselect}
                />
              </Pressable>
            </Pressable>
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
