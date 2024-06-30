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

  const { entries, markers, date, handleEntrySelect, handleDateChange } =
    useController();

  return (
    <ScreenTemplate screenName={route.name}>
      <View style={styles.wrapper}>
        <View style={styles.map}>
          {markers && (
            <Map markers={markers} onMarkerPress={handleEntrySelect} />
          )}
        </View>
        <View style={styles.sideBar}>
          <DateBar date={new Date(date)} onDateChange={handleDateChange} />
          <ScrollView>
            {entries && (
              <Timeline entries={entries} onEntryPress={handleEntrySelect} />
            )}
          </ScrollView>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default HomeScreen;
