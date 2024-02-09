import React, { useEffect } from "react";
import { View } from "react-native";
import { makeISO8601Date } from "@quoll/client-lib";

import { useStyles } from "./styles";

import { Map, MarkerProps } from "@modules/map/ui/Map";
import { DateBar } from "@modules/date-bar/ui/DateBar";
import { useDateViewModel } from "@modules/date-bar/view-model";
import { useTimelineViewModel } from "@modules/timeline/view-model";
import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";

const HomeScreen = (_: ScreenProps<"home">) => {
  const styles = useStyles();
  const { date, setDate } = useDateViewModel();
  const { entries, fetchTimeline } = useTimelineViewModel();

  const handleDateChange = (newDate: Date) => {
    const formattedDate = makeISO8601Date(newDate);
    setDate(formattedDate);
    fetchTimeline(formattedDate);
  };

  // TODO create a feeds model and don't fetch until isConnected is evaluated for each feed
  useEffect(() => {
    fetchTimeline(date);
  }, []);

  const markers: MarkerProps[] = entries
    .filter(({ locationStart, polyline, mediaUri }) => {
      const hasLocation = locationStart?.latitude && locationStart.longitude;

      return hasLocation && !polyline && !!mediaUri;
    })
    .map(({ locationStart, mediaUri }) => {
      // These casts are safe based on above filter

      const coordinate = {
        latitude: locationStart.latitude,
        longitude: locationStart.longitude,
      } as MarkerProps["coordinate"];

      const image = {
        uri: mediaUri,
      } as MarkerProps["image"];

      return {
        coordinate,
        image,
      };
    });

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
