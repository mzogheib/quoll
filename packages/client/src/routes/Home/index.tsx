import { useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { HorizontalLoader } from '@quoll/ui-components'
import { connect, useSelector } from 'react-redux'

import { selectDate, setDate } from '../../store/date'
import { fetchTimeline, selectTimeline } from '../../store/timeline'
import { selectFocussedItem, setFocussedItem } from '../../store/focussed-item'
import DatePicker from '../../components/DatePicker'
import Timeline from '../../components/Timeline'
import Map from '../../components/Map'
import store, { AppDispatch } from '../../store'
import { Entry } from '../../services/timeline'
import { decodePath } from '../../components/Map/utilsNew'

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

const makePolylinesOptions = (
  entries: Entry[],
  focussedItemId?: string
): google.maps.PolylineOptions[] =>
  entries
    .filter((entry) => entry.polyline)
    .map((entry) => ({
      // TypeScript can't seem to infer that polyline must be defined
      path: decodePath(entry.polyline as string),
      strokeColor: entry.id === focussedItemId ? 'red' : 'black',
    }))

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

type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = DispatchProps

const Home = ({ onMount, onDateChange, onEntryClick }: Props) => {
  const date = useSelector(selectDate)
  // TODO
  const focussedItem = useSelector(selectFocussedItem)
  const { isFetching, entries } = useSelector(selectTimeline)

  const polylineOptions = useMemo(
    () => makePolylinesOptions(entries, focussedItem.id ?? undefined),
    [entries, focussedItem.id]
  )

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
            <Timeline
              entries={entries}
              onEntryClick={(id) => onEntryClick(id, null, null)}
            />
          </TimelineBody>
        </TimelineWrapper>
      </Left>
      <MapWrapper>
        <MapBody>
          <Map polylinesOptions={polylineOptions} />
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
  onEntryClick: (
    id: string | null,
    latitude: number | null,
    longitude: number | null
  ) => dispatch(setFocussedItem(id, latitude, longitude)),
})

export default connect(undefined, mapDispatchToProps)(Home)
