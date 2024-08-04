import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { HorizontalLoader } from "@quoll/ui-components";
import { ISO8601Date, isSameDay, makeISO8601Date } from "@quoll/lib";

import { useTimelineViewModel } from "modules/timeline/view-model";
import { useDateViewModelModel } from "modules/date/view-model";
import { useAuthUserViewModel } from "modules/auth-user/view-model";
import DatePicker from "modules/date/views/DatePicker";
import Timeline from "modules/timeline/views/Timeline";
import Map from "components/Map";
import {
  makePolylineConfigs,
  makeInfoWindowOptions,
  makeMarkerConfigs,
} from "./mapUtils";

const Wrapper = styled.div(
  ({ theme: { media } }) => css`
    flex: 1;
    display: flex;
    position: relative;

    ${media.breakpointDown(media.md)`
      flex-direction: column-reverse;
    `};
  `,
);

const Left = styled.div(
  ({ theme: { media } }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    height: 100%;

    ${media.breakpointDown(media.md)`
      max-width: unset;
      width: 100%;
      height: unset;
      flex: 2;
    `};
  `,
);

const TimelineWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const TimelineBody = styled.div`
  overflow-y: scroll;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const MapWrapper = styled.div(
  ({ theme: { media } }) => css`
    position: relative;
    flex: 1;

    ${media.breakpointDown(media.md)`
      flex: 5;
    `};
  `,
);
const MapBody = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Home = () => {
  const { user } = useAuthUserViewModel();
  const { date, setDate } = useDateViewModelModel();
  const { isFetching, entries, fetchTimeline } = useTimelineViewModel();

  const [didFetchOnce, setDidFetchOnce] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [focussedEntryId, setFocussedEntryId] = useState<string>();
  const [focussedEntryLatLng, setFocussedEntryLatLng] =
    useState<google.maps.LatLngLiteral>();
  const focussedEntry = entries?.find(({ id }) => id === focussedEntryId);

  const handleEntryClick = (id: string, latLng?: google.maps.LatLngLiteral) => {
    setFocussedEntryId(id);
    setFocussedEntryLatLng(latLng);
  };

  const handleDateChange = (newDate: ISO8601Date) => {
    setFocussedEntryId(undefined);
    setFocussedEntryLatLng(undefined);
    setDate(newDate);
    fetchTimeline(newDate);
  };

  const polylineConfigs = useMemo(() => {
    if (!isMapReady || entries === null) return;

    return makePolylineConfigs(entries, focussedEntryId, handleEntryClick);
  }, [entries, focussedEntryId, isMapReady]);

  const markerConfigs = useMemo(() => {
    if (!isMapReady || entries === null) return;

    return makeMarkerConfigs(entries, focussedEntryId, handleEntryClick);
  }, [entries, focussedEntryId, isMapReady]);

  const infoWindowOptions = useMemo(() => {
    if (!isMapReady || focussedEntry === undefined) return;

    return makeInfoWindowOptions(focussedEntry, focussedEntryLatLng);
  }, [focussedEntry, focussedEntryLatLng, isMapReady]);

  useEffect(() => {
    if (didFetchOnce || user === null) return;

    setDidFetchOnce(true);
    fetchTimeline(date);
  }, [date, didFetchOnce, fetchTimeline, user]);

  const dateIsToday = (date: ISO8601Date) =>
    isSameDay(new Date(date), new Date());

  return (
    <Wrapper>
      <Left>
        <DatePicker
          date={date}
          maxDate={makeISO8601Date(new Date())}
          prevDisabled={isFetching}
          nextDisabled={isFetching || dateIsToday(date)}
          calendarDisabled={isFetching}
          onDateChange={handleDateChange}
        />
        <TimelineWrapper>
          <TimelineBody>
            {entries === null ? null : (
              <Timeline entries={entries} onEntryClick={handleEntryClick} />
            )}
          </TimelineBody>
        </TimelineWrapper>
      </Left>
      <MapWrapper>
        <MapBody>
          <Map
            markerConfigs={markerConfigs}
            polylineConfigs={polylineConfigs}
            infoWindowOptions={infoWindowOptions}
            onMapLoaded={() => setIsMapReady(true)}
          />
        </MapBody>
      </MapWrapper>
      {isFetching && (
        <LoaderWrapper>
          <HorizontalLoader />
        </LoaderWrapper>
      )}
    </Wrapper>
  );
};

export default Home;
