import React, { Component } from 'react';
import './style.css';
import DatePicker from '../../components/date-picker';
import Feed from '../../components/feed';
import Map from '../../components/map';
import Loader from '../../components/horizontal-loader';
import moment from 'moment';

class App extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  dateIsToday(date) {
    return moment(date).isSame(moment(), 'day');
  } 

  render() {
    return (
      <div className='home'>
        <div className='home__left'>
          <DatePicker 
            date={this.props.date}
            maxDate={new Date()}
            prevDisabled={this.props.isLoading}
            nextDisabled={this.props.isLoading || this.dateIsToday(this.props.date)}
            calendarDisabled={this.props.isLoading}
            onDateChange={date => this.props.onDateChange(date)}
          />
          <div className='home__feed-wrapper'>
            <div className='home__feed'>
              <Feed
                feeds={this.props.feeds}
                onEntryClick={id => this.props.onEntryClick(id)}
              />
            </div>
          </div>
        </div>
        <div className='home__map-wrapper'>
          <div className='home__map'><Map /></div>
        </div>
        {this.props.isLoading && (<div className='home__loader'><Loader/></div>)}
      </div>
    );
  }
}

export default App;
