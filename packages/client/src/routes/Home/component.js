import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import DatePicker from '../../components/DatePicker'
import Timeline from '../../components/Timeline'
import Map from '../../components/Map'
import Loader from '../../components/HorizontalLoader'
import './style.scss'

class Home extends Component {
  componentDidMount() {
    this.props.onMount()
  }

  dateIsToday = date => moment(date).isSame(moment(), 'day')

  render() {
    return (
      <div className="home">
        <div className="home__left">
          <DatePicker
            date={this.props.date}
            maxDate={moment().format('YYYY-MM-DD')}
            prevDisabled={this.props.isLoading}
            nextDisabled={
              this.props.isLoading || this.dateIsToday(this.props.date)
            }
            calendarDisabled={this.props.isLoading}
            onDateChange={this.props.onDateChange}
          />
          <div className="home__timeline-wrapper">
            <div className="home__timeline">
              <Timeline
                timeline={this.props.timeline}
                onEntryClick={this.props.onEntryClick}
              />
            </div>
          </div>
        </div>
        <div className="home__map-wrapper">
          <div className="home__map">
            <Map
              markerData={this.props.markerData}
              polylineData={this.props.polylineData}
              focussedItem={this.props.focussedItem}
              onElementSelect={this.props.onEntryClick}
            />
          </div>
        </div>
        {this.props.isLoading && (
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
  timeline: PropTypes.any.isRequired,
  markerData: PropTypes.any.isRequired,
  polylineData: PropTypes.any.isRequired,
  focussedItem: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onMount: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onEntryClick: PropTypes.func.isRequired,
}

export default Home
