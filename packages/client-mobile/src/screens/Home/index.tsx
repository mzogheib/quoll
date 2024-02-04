import React, { useEffect } from "react";
import { View } from "react-native";
import { Map, MarkerProps } from "@modules/map/ui/Map";
import { DateBar } from "@modules/date-bar/ui/DateBar";

import { useStyles } from "./styles";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";
import { useMediaViewModel } from "@modules/media/view-model";
import { makeDateFilter, makeISO8601Date } from "@modules/date-bar/logic";
import { useDateViewModel } from "@modules/date-bar/view-model";
import { useTimelineViewModel } from "@modules/timeline/view-model";

const HomeScreen = (_: ScreenProps<"home">) => {
  const styles = useStyles();
  const { isConnected, isCheckingPermission, refresh } = useMediaViewModel();
  const { date, setDate } = useDateViewModel();
  const { entries, fetchTimeline } = useTimelineViewModel();

  const handleDateChange = (newDate: Date) => {
    const formattedDate = makeISO8601Date(newDate);
    setDate(formattedDate);
    fetchTimeline(formattedDate);
  };

  useEffect(() => {
    const _refresh = async () => {
      const dateFilter = makeDateFilter(new Date(date));
      await refresh(dateFilter);
    };

    if (isCheckingPermission) return;

    if (isConnected) _refresh();
  }, [date, isConnected, isCheckingPermission, refresh]);

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
