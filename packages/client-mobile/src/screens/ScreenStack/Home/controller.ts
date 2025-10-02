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

  const selectedEntry = useMemo(() => {
    return entries?.find((entry) => entry.id === selectedEntryId) || null;
  }, [entries, selectedEntryId]);

  const selectedEntryIndex = useMemo(() => {
    if (entries === null || selectedEntryId === null) return -1;

    return entries.findIndex((entry) => entry.id === selectedEntryId);
  }, [entries, selectedEntryId]);

  useEffect(() => {
    if (didFetchOnce || !isAuthenticated) return;

    setDidFetchOnce(true);
    fetchTimeline(date);
  }, [date, didFetchOnce, fetchTimeline, isAuthenticated]);

  const handleEntrySelect = (id: string | null) => setSelectedEntryId(id);

  const handleEntrySelectNext = () => {
    if (
      entries === null ||
      selectedEntryIndex === -1 ||
      selectedEntryIndex === entries.length - 1
    ) {
      return;
    }

    const nextEntry = entries[selectedEntryIndex + 1];
    setSelectedEntryId(nextEntry.id);
  };

  const handleEntrySelectPrev = () => {
    if (entries === null || selectedEntryIndex <= 0) {
      return;
    }

    const prevEntry = entries[selectedEntryIndex - 1];
    setSelectedEntryId(prevEntry.id);
  };

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

  return {
    entries,
    selectedEntry,
    markers,
    date,
    handleEntrySelect,
    handleEntrySelectNext,
    handleEntrySelectPrev,
    handleEntryDeselect,
    handleDateChange,
  };
};

export default useController;
