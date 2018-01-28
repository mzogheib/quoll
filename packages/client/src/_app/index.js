import React, { Component } from 'react';
import './style.css';
import Menu from '../menu';
import Map from '../map';
import Api from '../_utils/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
  }

  componentDidMount() {
    const services = this.getServices();
    this.setState({ services: services });
  }

  getServices() {
    return [
      {
        id: 'toshl',
        name: 'Toshl',
        active: false,
        data: []
      },
      {
        id: 'instagram',
        name: 'Instagram',
        active: false,
        data: []
      },
      {
        id: 'strava',
        name: 'Strava',
        active: false,
        data: []
      }
    ];
  }

  getServiceData(serviceId) {
    if (serviceId === 'toshl') {
      return Api.getToshlLocations()
        .catch((response) => {
          console.debug(response);
        });
    } else {
      return Promise.resolve([]);
    }
  }

  handleItemToggle(id) {
    const updatedService = this.state.services.find(service => service.id === id);
    if (updatedService) {
      updatedService.active = !updatedService.active;
      if (updatedService.active) {
        // Fetch the data
        this.getServiceData(updatedService.id)
          .then(data => {
            updatedService.data = data;
            const updatedServices = this.state.services.map(service => service.id === updatedService.id ? updatedService : service);
            this.setState({ services: updatedServices });
          });
      } else {
        // Clear the data
        updatedService.data = [];
        const updatedServices = this.state.services.map(service => service.id === updatedService.id ? updatedService : service);
        this.setState({ services: updatedServices });
  }
    }
  }

  render() {
    const layerData = 
      this.state.services
        .filter(service => service.active)
        .map(service => { return { id: service.id, data: service.data }});
    return (
      <div className='app'>
        <div className='app__menu'><Menu items={this.state.services} onItemToggle={this.handleItemToggle.bind(this)}></Menu></div>
        <div className='app__map'><Map layers={layerData}></Map></div>
      </div>
    );
  }
}

export default App;
