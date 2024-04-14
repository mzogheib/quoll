import { makeISO8601Date } from "@quoll/lib";

import { MarkerProps } from "@components/Map";
import { useDateViewModel } from "@modules/date/view-model";
import { useTimelineViewModel } from "@modules/timeline/view-model";
import { useState } from "react";

const useController = () => {
  const { date, setDate } = useDateViewModel();
  const { entries, fetchTimeline } = useTimelineViewModel(date);
  const [focussedEntryId, setFocussedEntryId] = useState<string | null>(null);

  const handleEntrySelect = (id: string | null) => setFocussedEntryId(id);

  const handleDateChange = (newDate: Date) => {
    setFocussedEntryId(null);
    const formattedDate = makeISO8601Date(newDate);
    setDate(formattedDate);
    fetchTimeline(formattedDate);
  };

  const markers: MarkerProps[] = entries
    .filter(({ locationStart, polyline, mediaUri }) => {
      const hasLocation = locationStart?.latitude && locationStart.longitude;

      return hasLocation && !polyline && !!mediaUri;
    })
    .map(({ id, locationStart, mediaUri }) => ({
      // The ! assertions are safe based on above filter
      id,
      coordinate: {
        latitude: locationStart!.latitude,
        longitude: locationStart!.longitude,
      },
      image: { uri: mediaUri! },
      isFocussed: id === focussedEntryId,
    }));

  return {
    entries,
    markers,
    date,
    handleEntrySelect,
    handleDateChange,
  };
};

export default useController;
