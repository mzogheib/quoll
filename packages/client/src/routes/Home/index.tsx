import { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { HorizontalLoader } from '@quoll/ui-components'
import { useDispatch, useSelector } from 'react-redux'

import { selectDate, setDate } from '../../store/date'
import { fetchTimeline, selectTimeline } from '../../store/timeline'
import DatePicker from '../../components/DatePicker'
import Timeline from '../../components/Timeline'
import Map from '../../components/Map'
import store from '../../store'
import { makePolylineConfigs, makeInfoWindowOptions } from './mapUtils'

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

const Home = () => {
  const dispatch = useDispatch()
  const date = useSelector(selectDate)
  const { isFetching, entries } = useSelector(selectTimeline)

  const [focussedEntryId, setFocussedEntryId] = useState<string>()
  const [focussedEntryLatLng, setFocussedEntryLatLng] =
    useState<google.maps.LatLngLiteral>()
  const focussedEntry = entries.find(({ id }) => id === focussedEntryId)

  const handleEntryClick = (id: string, latLng?: google.maps.LatLngLiteral) => {
    setFocussedEntryId(id)
    setFocussedEntryLatLng(latLng)
  }

  const handleDateChange = (date: string) => {
    setFocussedEntryId(undefined)
    setFocussedEntryLatLng(undefined)
    dispatch(setDate(date))
    fetchTimeline()(dispatch, getState)
  }

  const polylineConfigs = useMemo(() => {
    return makePolylineConfigs(entries, focussedEntryId, handleEntryClick)
  }, [entries, focussedEntryId])

  const infoWindowOptions = focussedEntry
    ? makeInfoWindowOptions(focussedEntry, focussedEntryLatLng)
    : undefined

  // TODO this should listen to the date change instead
  useEffect(() => {
    fetchTimeline()(dispatch, getState)
  }, [dispatch])

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
          onDateChange={handleDateChange}
        />
        <TimelineWrapper>
          <TimelineBody>
            <Timeline entries={entries} onEntryClick={handleEntryClick} />
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

export default Home
