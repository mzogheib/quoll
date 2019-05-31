import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import DatePicker from '../../components/DatePicker'
import Timeline from '../../components/Timeline'
import Map from '../../components/Map'
import Loader from '../../components/HorizontalLoader'
import './index.scss'

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
      <div className="home">
        <div className="home__left">
          <DatePicker
            date={date}
            maxDate={moment().format('YYYY-MM-DD')}
            prevDisabled={isLoading}
            nextDisabled={isLoading || this.dateIsToday(date)}
            calendarDisabled={isLoading}
            onDateChange={onDateChange}
          />
          <div className="home__timeline-wrapper">
            <div className="home__timeline">
              <Timeline entries={timelineEntries} onEntryClick={onEntryClick} />
            </div>
          </div>
        </div>
        <div className="home__map-wrapper">
          <div className="home__map">
            <Map
              markerData={markerData}
              polylineData={polylineData}
              focussedItem={focussedItem}
              onElementSelect={onEntryClick}
            />
          </div>
        </div>
        {isLoading && (
          <div className="home__loader">
            <Loader />
          </div>
        )}
      </div>
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
