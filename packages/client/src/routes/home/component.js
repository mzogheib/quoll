import React, { Component } from 'react';
import './style.css';
import Menu from '../../components/menu';
import Map from '../../components/map';

class App extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div className='app'>
        <div className='home__menu'><Menu /></div>
        <div className='home__map-wrapper'>
          <div className='home__map'><Map /></div>
        </div>
      </div>
    );
  }
}

export default App;
