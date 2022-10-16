import { useEffect } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { HorizontalLoader } from '@quoll/ui-components'
import { connect } from 'react-redux'

import { setDate } from '../../store/date'
import { fetchTimeline } from '../../store/timeline'
import { setFocussedItem } from '../../store/focussed-item'
import DatePicker from '../../components/DatePicker'
import Timeline from '../../components/Timeline'
import Map from '../../components/Map'
import store, { AppDispatch, RootState } from '../../store'

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

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = StateProps & DispatchProps

const Home = ({
  onMount,
  date,
  isLoading,
  onDateChange,
  timelineEntries,
  onEntryClick,
  markerData,
  polylineData,
  focussedItem,
}: Props) => {
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
          prevDisabled={isLoading}
          nextDisabled={isLoading || dateIsToday(date)}
          calendarDisabled={isLoading}
          onDateChange={onDateChange}
        />
        <TimelineWrapper>
          <TimelineBody>
            <Timeline entries={timelineEntries} onEntryClick={onEntryClick} />
          </TimelineBody>
        </TimelineWrapper>
      </Left>
      <MapWrapper>
        <MapBody>
          <Map
            markerData={markerData}
            polylineData={polylineData}
            focussedItem={focussedItem}
            onElementSelect={onEntryClick}
          />
        </MapBody>
      </MapWrapper>
      {isLoading && (
        <LoaderWrapper>
          <HorizontalLoader />
        </LoaderWrapper>
      )}
    </Wrapper>
  )
}

const mapStateToProps = ({ date, timeline, focussedItem }: RootState) => {
  const markerData = timeline.entries
    .filter((entry) => !entry.polyline && entry.locationStart)
    .map((entry) => ({
      id: entry.id,
      latitude: entry.locationStart.latitude,
      longitude: entry.locationEnd.longitude,
      title: entry.title,
      subTitle: moment.unix(entry.timeStart).format('h:mm a'),
      description: entry.description || '',
    }))
  const polylineData = timeline.entries
    .filter((entry) => entry.polyline)
    .map((entry) => ({
      id: entry.id,
      // TypeScript can't seem to infer that polyline must be defined
      encodedPath: entry.polyline as string,
      title: entry.title,
      subTitle: moment.unix(entry.timeStart).format('h:mm a'),
      description: entry.description || '',
    }))
  const isLoading = timeline.isFetching

  return {
    date,
    timelineEntries: timeline.entries,
    markerData,
    polylineData,
    focussedItem,
    isLoading,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onMount: () => fetchTimeline()(dispatch, getState),
  onDateChange: (date: string) => {
    dispatch(setDate(date))
    return fetchTimeline()(dispatch, getState).then(() =>
      dispatch(setFocussedItem())
    )
  },
  onEntryClick: (id: string, latitude?: number, longitude?: number) =>
    dispatch(setFocussedItem(id, latitude, longitude)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
