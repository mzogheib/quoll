import React from "react";
import { View } from "react-native";
import { makeISO8601Date } from "@quoll/lib";

import { useStyles } from "./styles";

import { Map, MarkerProps } from "@modules/map/ui/Map";
import { DateBar } from "@modules/date-bar/ui/DateBar";
import { useDateViewModel } from "@modules/date-bar/view-model";
import { useTimelineViewModel } from "@modules/timeline/view-model";
import { ScreenProps } from "../config";
import ScreenTemplate from "../ScreenTemplate";

const HomeScreen = (_: ScreenProps<"home">) => {
  const styles = useStyles();
  const { date, setDate } = useDateViewModel();
  const { entries, fetchTimeline } = useTimelineViewModel(date);

  const handleDateChange = (newDate: Date) => {
    const formattedDate = makeISO8601Date(newDate);
    setDate(formattedDate);
    fetchTimeline(formattedDate);
  };

  const markers: MarkerProps[] = entries
    .filter(({ locationStart, polyline, mediaUri }) => {
      const hasLocation = locationStart?.latitude && locationStart.longitude;

      return hasLocation && !polyline && !!mediaUri;
    })
    .map(({ locationStart, mediaUri }) => ({
      // The ! assertions are safe based on above filter
      coordinate: {
        latitude: locationStart!.latitude,
        longitude: locationStart!.longitude,
      },
      image: { uri: mediaUri! },
    }));

  return (
    <ScreenTemplate>
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
