import { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { HorizontalLoader } from '@quoll/ui-components'
import { connect, useDispatch, useSelector } from 'react-redux'

import { selectDate, setDate } from '../../store/date'
import { fetchTimeline, selectTimeline } from '../../store/timeline'
import { selectFocussedItem, setFocussedItem } from '../../store/focussed-item'
import DatePicker from '../../components/DatePicker'
import Timeline from '../../components/Timeline'
import Map from '../../components/Map'
import store, { AppDispatch } from '../../store'
import { Entry } from '../../services/timeline'
import { decodePath } from '../../components/Map/utilsNew'
import { PolylineConfig } from '../../components/Map/Component'

const { getState } = store

const Wrapper = styled.div(
  ({ theme: { media } }) => css`
    flex: 1;
    display: flex;
    position: relative;

    ${media.breakpointDown(media.md)`
      flex-direction: column-reverse;
    `};
  `
)

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
  `
)

const TimelineWrapper = styled.div`
  position: relative;
  flex: 1;
`

const TimelineBody = styled.div`
  overflow-y: scroll;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const MapWrapper = styled.div(
  ({ theme: { media } }) => css`
    position: relative;
    flex: 1;

    ${media.breakpointDown(media.md)`
      flex: 5;
    `};
  `
)
const MapBody = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const makePolylineConfigs = (
  entries: Entry[],
  focussedItemId: string | undefined,
  onClick: (id: string, latLng?: google.maps.LatLngLiteral) => void
): PolylineConfig[] =>
  entries
    .filter((entry) => entry.polyline)
    .map((entry) => {
      return {
        options: {
          // TypeScript can't seem to infer that polyline must be defined
          path: decodePath(entry.polyline as string),
          strokeColor: entry.id === focussedItemId ? 'red' : 'black',
        },
        onClick: ({ latLng }) => onClick(entry.id, latLng?.toJSON()),
      }
    })

// TODO
const makeMarkerOptions = (entries: Entry[]): google.maps.MarkerOptions[] =>
  entries
    .filter((entry) => !entry.polyline && entry.locationStart)
    .map((entry) => ({
      id: entry.id,
      latitude: entry.locationStart?.latitude,
      longitude: entry.locationEnd?.longitude,
      title: entry.title,
      subTitle: moment.unix(entry.timeStart).format('h:mm a'),
      description: entry.description || '',
    }))

const makeInfoWindowPosition = ({
  locationStart,
  polyline: path,
}: Entry): google.maps.LatLngLiteral | google.maps.LatLng | undefined => {
  if (locationStart?.latitude && locationStart.longitude) {
    return {
      lat: locationStart.latitude,
      lng: locationStart.longitude,
    }
  }

  if (path) {
    const polyline = new google.maps.Polyline()
    polyline.setPath(decodePath(path))

    return polyline.getPath().getArray()[0]
  }
}

const makeInfoWindowOptions = (
  entry: Entry,
  position?: google.maps.LatLngLiteral
): google.maps.InfoWindowOptions => {
  const { title, timeStart } = entry

  const description = entry.description ?? ''
  const subTitle = moment.unix(timeStart).format('h:mm a')

  const content =
    '<div>' +
    `<h1>${title}</h1>` +
    `<h2>${subTitle}</h2>` +
    `<p>${description.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>` +
    '</div>'

  return { content, position: position ?? makeInfoWindowPosition(entry) }
}

type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = DispatchProps

const Home = ({ onMount, onDateChange }: Props) => {
  const date = useSelector(selectDate)
  const { isFetching, entries } = useSelector(selectTimeline)

  const [focussedEntryId, setFocussedEntryId] = useState<string>()
  const [focussedEntryLatLng, setFocussedEntryLatLng] =
    useState<google.maps.LatLngLiteral>()
  const focussedEntry = entries.find(({ id }) => id === focussedEntryId)

  const onEntryClick = (id: string, latLng?: google.maps.LatLngLiteral) => {
    setFocussedEntryId(id)
    setFocussedEntryLatLng(latLng)
  }

  const polylineConfigs = useMemo(() => {
    return makePolylineConfigs(entries, focussedEntryId, onEntryClick)
  }, [entries, focussedEntryId])

  const infoWindowOptions = focussedEntry
    ? makeInfoWindowOptions(focussedEntry, focussedEntryLatLng)
    : undefined

  useEffect(() => {
    onMount()
  }, [onMount])

  const dateIsToday = (date: string) => moment(date).isSame(moment(), 'day')

  return (
    <Wrapper>
      <Left>
        <DatePicker
          date={date}
          maxDate={moment().format('YYYY-MM-DD')}
          prevDisabled={isFetching}
          nextDisabled={isFetching || dateIsToday(date)}
          calendarDisabled={isFetching}
          onDateChange={onDateChange}
        />
        <TimelineWrapper>
          <TimelineBody>
            <Timeline entries={entries} onEntryClick={onEntryClick} />
          </TimelineBody>
        </TimelineWrapper>
      </Left>
      <MapWrapper>
        <MapBody>
          <Map
            polylineConfigs={polylineConfigs}
            infoWindowOptions={infoWindowOptions}
          />
        </MapBody>
      </MapWrapper>
      {isFetching && (
        <LoaderWrapper>
          <HorizontalLoader />
        </LoaderWrapper>
      )}
    </Wrapper>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onMount: () => fetchTimeline()(dispatch, getState),
  onDateChange: (date: string) => {
    dispatch(setDate(date))
    return fetchTimeline()(dispatch, getState).then(() =>
      dispatch(setFocussedItem(null, null, null))
    )
  },
})

export default connect(undefined, mapDispatchToProps)(Home)
