import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import { HorizontalLoader } from '@quoll/ui-components'

import DatePicker from '../../components/DatePicker'
import Timeline from '../../components/Timeline'
import Map from '../../components/Map'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  position: relative;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 350px;
  max-width: 350px;
  height: 100%;
`

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

const MapWrapper = styled.div`
  position: relative;
  flex: 1;
`

const MapBody = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const LoaderWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`

class Home extends Component {
  componentDidMount() {
    this.props.onMount()
  }

  dateIsToday = date => moment(date).isSame(moment(), 'day')

  render() {
    const {
      date,
      isLoading,
      onDateChange,
      timelineEntries,
      onEntryClick,
      markerData,
      polylineData,
      focussedItem,
    } = this.props
    return (
      <Wrapper>
        <Left>
          <DatePicker
            date={date}
            maxDate={moment().format('YYYY-MM-DD')}
            prevDisabled={isLoading}
            nextDisabled={isLoading || this.dateIsToday(date)}
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
}

Home.propTypes = {
  date: PropTypes.string.isRequired,
  timelineEntries: PropTypes.any.isRequired,
  markerData: PropTypes.any.isRequired,
  polylineData: PropTypes.any.isRequired,
  focussedItem: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onMount: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onEntryClick: PropTypes.func.isRequired,
}

export default Home
