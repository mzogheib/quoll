import { useEffect, useMemo, useState } from "react";
import { makeISO8601Date } from "@quoll/lib/modules";

import { MarkerProps } from "@components/Map/types";
import { useDateViewModel } from "@modules/date/view-model";
import { useTimelineViewModel } from "@modules/timeline/view-model";
import { useAuthViewModel } from "@modules/auth/view-model";

const useController = () => {
  const { isAuthenticated } = useAuthViewModel();
  const { date, setDate } = useDateViewModel();
  const { entries, fetchTimeline } = useTimelineViewModel();
  const [didFetchOnce, setDidFetchOnce] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  useEffect(() => {
    if (didFetchOnce || !isAuthenticated) return;

    setDidFetchOnce(true);
    fetchTimeline(date);
  }, [date, didFetchOnce, fetchTimeline, isAuthenticated]);

  const handleEntrySelect = (id: string | null) => setSelectedEntryId(id);

  const handleEntryDeselect = () => setSelectedEntryId(null);

  const handleDateChange = (newDate: Date) => {
    setSelectedEntryId(null);
    const formattedDate = makeISO8601Date(newDate);
    setDate(formattedDate);

    if (!isAuthenticated) return;

    fetchTimeline(formattedDate);
  };

  const markers: MarkerProps[] | null =
    entries === null
      ? null
      : entries
          .filter(({ locationStart, polyline }) => {
            const hasLocation =
              locationStart?.latitude && locationStart.longitude;

            return hasLocation && !polyline;
          })
          .map(({ id, locationStart, mediaUri }) => ({
            // The ! assertions are safe based on above filter
            id,
            coordinate: {
              latitude: locationStart!.latitude,
              longitude: locationStart!.longitude,
            },
            image: mediaUri === null ? null : { uri: mediaUri },
          }));

  const selectedEntry = useMemo(() => {
    return entries?.find((entry) => entry.id === selectedEntryId) || null;
  }, [entries, selectedEntryId]);

  return {
    entries,
    selectedEntry,
    markers,
    date,
    handleEntrySelect,
    handleEntryDeselect,
    handleDateChange,
  };
};

export default useController;
