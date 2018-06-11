import React, { Component } from 'react';
import './style.css';
import Menu from '../menu';
import Map from '../map';

class App extends Component {

  componentDidMount() {
    this.props.refreshFeeds();
  }

  render() {
    return (
      <div className='app'>
        <div className='app__menu'><Menu /></div>
        <div className='app__map-wrapper'>
          <div className='app__map'><Map /></div>
        </div>
      </div>
    );
  }
}

export default App;
