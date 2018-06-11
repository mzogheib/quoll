import React, { Component } from 'react';
import './style.css';
import Feed from '../../components/feed';
import Map from '../../components/map';

class App extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div className='home'>
        <div className='home__feed'><Feed /></div>
        <div className='home__map-wrapper'>
          <div className='home__map'><Map /></div>
        </div>
      </div>
    );
  }
}

export default App;
