import React, { Component } from 'react'
import './style.scss'
import DatePicker from '../../components/DatePicker'
import Feed from '../../components/Feed'
import Map from '../../components/Map'
import Loader from '../../components/HorizontalLoader'
import moment from 'moment'

class App extends Component {
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
            maxDate={new Date()}
            prevDisabled={this.props.isLoading}
            nextDisabled={
              this.props.isLoading || this.dateIsToday(this.props.date)
            }
            calendarDisabled={this.props.isLoading}
            onDateChange={this.props.onDateChange}
          />
          <div className="home__feed-wrapper">
            <div className="home__feed">
              <Feed
                feed={this.props.feed}
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

export default App
