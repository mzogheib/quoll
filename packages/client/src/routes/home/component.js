import React, { Component } from 'react';
import './style.css';
import DatePicker from '../../components/date-picker';
import FeedEntries from '../../components/feed-entries';
import Map from '../../components/map';
import Loader from '../../components/horizontal-loader';

class App extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div className='home'>
        <div className='home__feed'>
          <DatePicker />
          <div className='home__feed-entries-wrapper'>
            <div className='home__feed-entries'><FeedEntries /></div>
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
