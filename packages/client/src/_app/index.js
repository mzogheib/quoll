import React, { Component } from 'react';
import './style.css';
import Menu from '../menu';
import Map from '../map';
import Utils from '../_utils/'
import Toshl from '../_utils/toshl';
import Strava from '../_utils/strava';

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
    
    const queryParams = Utils.parseQueryParams(window.location.search);
    if (queryParams && queryParams.state === 'strava-auth') {
      // Remove the query params. 
      window.history.replaceState(null, null, window.location.pathname);
      if (queryParams.code) {
        Strava.authenticate({ code: queryParams.code })
          .catch(response => console.log)
      } else if (queryParams.error && queryParams.error === 'access_denied') {
        console.debug('Strave access denied.');
      } else {
        console.debug('Unknown response from Strava.');
      }
    }
  }

  getServices() {
    return [
      {
        id: 'toshl',
        name: 'Toshl',
        active: false,
        data: [],
        fetch: Toshl.getEntries,
        normalize: Toshl.convertEntriesToLocations
      },
      {
        id: 'instagram',
        name: 'Instagram',
        active: false,
        data: [],
        fetch: () => Promise.resolve([]),
        normalize: () => []
      },
      {
        id: 'strava',
        name: 'Strava',
        active: false,
        authUrl: 'https://www.strava.com/oauth/authorize?client_id=8709&response_type=code&redirect_uri=http://localhost:3000&state=strava-auth&scope=view_private',
        data: [],
        fetch: Strava.getActivities,
        normalize: () => []
      }
    ];
  }

  handleItemToggle(id) {
    let services = this.state.services.slice();
    const serviceToUpdate = services.find(service => service.id === id);
    if (serviceToUpdate) {
      serviceToUpdate.active = !serviceToUpdate.active;
      if (serviceToUpdate.active) {
        // Fetch the data
        serviceToUpdate.fetch(this.state.filter)
          .then(data => {
            serviceToUpdate.data = data;
            services = services.map(service => service.id === serviceToUpdate.id ? serviceToUpdate : service);
            this.setState({ services: services });
          })
          .catch((response) => {
            console.debug(response);
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
      return serviceToUpdate.fetch(filter)
        .then(data => {
          serviceToUpdate.data = data;
          services = services.map(service => service.id === serviceToUpdate.id ? serviceToUpdate : service);
        })
        .catch((response) => {
          console.debug(response);
        });
    });
    
    Promise.all(promises).then(() => { this.setState({ services: services }); })
  }

  render() {
    const layerData = this.state.services
      .filter(service => service.active)
      .map(service => service.normalize(service.data));
    return (
      <div className='app'>
        <div className='app__menu'><Menu items={this.state.services} onItemToggle={this.handleItemToggle.bind(this)} onFilterUpdate={this.handleFilterUpdate.bind(this)}></Menu></div>
        <div className='app__map'><Map layers={layerData}></Map></div>
      </div>
    );
  }
}

export default App;
