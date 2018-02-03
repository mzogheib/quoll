import React, { Component } from 'react';
import './style.css';
import Menu from '../menu';
import Map from '../map';
import Toshl from '../_utils/toshl';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      filter: {}
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

  getServiceData(serviceId, params) {
    if (serviceId === 'toshl') {
      return Toshl.getEntries(params)
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
        this.getServiceData(updatedService.id, this.state.filter)
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

  handleFilterUpdate(filter) {
    const servicesToUpdate = this.state.services.filter(service => service.active);
    this.setState({ filter: filter });

    if (!servicesToUpdate.length) {
      return;
    }

    const promises = servicesToUpdate.map(service => {
      return this.getServiceData(service.id, filter)
      .then(data => {
        servicesToUpdate.find(ser => ser.id === service.id).data = data;
      });
    });
    
    Promise.all(promises)
      .then(data => {
        // this sets only the active services. need to keep the inactive ones
        this.setState({ services: servicesToUpdate });
      })
  }

  render() {
    const layerData = [];
      // this.state.services
      //   .filter(service => service.active)
      //   .map(service => { return { id: service.id, data: service.data }});
    return (
      <div className='app'>
        <div className='app__menu'><Menu items={this.state.services} onItemToggle={this.handleItemToggle.bind(this)} onFilterUpdate={this.handleFilterUpdate.bind(this)}></Menu></div>
        <div className='app__map'><Map layers={layerData}></Map></div>
      </div>
    );
  }
}

export default App;
