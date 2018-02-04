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
    let services = this.state.services.slice();
    const serviceToUpdate = services.find(service => service.id === id);
    if (serviceToUpdate) {
      serviceToUpdate.active = !serviceToUpdate.active;
      if (serviceToUpdate.active) {
        // Fetch the data
        this.getServiceData(serviceToUpdate.id, this.state.filter)
          .then(data => {
            serviceToUpdate.data = data;
            services = services.map(service => service.id === serviceToUpdate.id ? serviceToUpdate : service);
            this.setState({ services: services });
          });
      } else {
        // Clear the data
        serviceToUpdate.data = [];
        services = services.map(service => service.id === serviceToUpdate.id ? serviceToUpdate : service);
        this.setState({ services: services });
      }
    }
  }

  handleFilterUpdate(filter) {
    this.setState({ filter: filter });
    let services = this.state.services.slice();
    const servicesToUpdate = services.filter(service => service.active);

    if (!servicesToUpdate.length) {
      return;
    }

    const promises = servicesToUpdate.map(serviceToUpdate => {
      return this.getServiceData(serviceToUpdate.id, filter)
        .then(data => {
          serviceToUpdate.data = data;
          services = services.map(service => service.id === serviceToUpdate.id ? serviceToUpdate : service);
        });
    });
    
    Promise.all(promises).then(() => { this.setState({ services: services }); })
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
