import React, { Component } from 'react';
import './style.css';
import DatePicker from '../../components/date-picker';
import Feed from '../../components/feed';
import Map from '../../components/map';
import Loader from '../../components/horizontal-loader';

class App extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div className='home'>
        <div className='home__left'>
          <DatePicker />
          <div className='home__feed-wrapper'>
            <div className='home__feed'><Feed /></div>
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
