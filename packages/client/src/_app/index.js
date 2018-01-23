import React, { Component } from 'react';
import './style.css';
import Menu from '../menu';
import Map from '../map';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='app__menu'><Menu></Menu></div>
        <div className='app__map'><Map></Map></div>
      </div>
    );
  }
}

export default App;
