import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Map, MarkerProps } from "@modules/map/ui/Map";
import { DateBar } from "@modules/date-bar/ui/DateBar";

import { useStyles } from "./styles";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";
import { useMedia } from "@modules/media/logic";
import { makeDateFilter } from "@modules/date-bar/logic";

const HomeScreen = (_: ScreenProps<"home">) => {
  const styles = useStyles();
  const { value, isConnected, isCheckingPermission, refresh } = useMedia();
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const _refresh = async () => {
      const dateFilter = makeDateFilter(date);
      await refresh(dateFilter);
    };

    if (isCheckingPermission) return;

    if (isConnected) _refresh();
  }, [date, isConnected, isCheckingPermission, refresh]);

  const mediaWithLocations = value.filter(
    (item) => item.location?.latitude && item.location.longitude,
  );

  const markers: MarkerProps[] = mediaWithLocations.map((item) => {
    const location = {
      latitude: item.location?.latitude,
      longitude: item.location?.longitude,
    } as MarkerProps["coordinate"]; // guaranteed to exist from above filter

    return {
      coordinate: location,
      image: { uri: item.image.uri },
    };
  });

  return (
    <ScreenTemplate>
      <View style={styles.wrapper}>
        <View style={styles.map}>
          <Map markers={markers} />
        </View>
        <View style={styles.sideBar}>
          <DateBar onDateChange={setDate} />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default HomeScreen;
