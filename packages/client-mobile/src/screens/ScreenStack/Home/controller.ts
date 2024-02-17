import { makeISO8601Date } from "@quoll/lib";

import { MarkerProps } from "@components/Map";
import { useDateViewModel } from "@modules/date/view-model";
import { useTimelineViewModel } from "@modules/timeline/view-model";

const useController = () => {
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

  return {
    markers,
    date,
    handleDateChange,
  };
};

export default useController;
