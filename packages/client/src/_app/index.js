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
      dataSources: [],
      filter: {}
    };
  }

  componentDidMount() {
    const dataSources = this.getDataSources();
    this.setState({ dataSources: dataSources });
    
    // Handle strava auth
    const queryParams = Utils.parseQueryParams(window.location.search);
    if (queryParams && queryParams.state === 'strava-auth') {
      // Remove the query params. 
      window.history.replaceState(null, null, window.location.pathname);
      if (queryParams.code) {
        Strava.authenticate({ code: queryParams.code })
          .then(() => {
            const dataSources = this.state.dataSources.slice();
            dataSources.forEach(dataSource => {
              if (dataSource.id === 'strava') {
                dataSource.connected = true;
              }
            });
            this.setState({ dataSources: dataSources }, this.getData);
          })
          .catch(console.debug)
      } else if (queryParams.error && queryParams.error === 'access_denied') {
        console.debug('Strave access denied.');
      } else {
        console.debug('Unknown response from Strava.');
      }
    }
  }

  getDataSources() {
    return [
      {
        id: 'toshl',
        name: 'Toshl',
        connected: true,
        data: [],
        fetch: Toshl.getEntries,
        normalize: Toshl.getMarkersFromEntries
      },
      {
        id: 'strava',
        name: 'Strava',
        connected: false,
        authUrl: 'https://www.strava.com/oauth/authorize?client_id=8709&response_type=code&redirect_uri=http://localhost:3000&state=strava-auth&scope=view_private',
        data: [],
        fetch: Strava.getActivities,
        normalize: Strava.getPolylinesFromActivities
      }
    ];
  }

  getData() {
    let dataSources = this.state.dataSources.slice();
    const connectedDataSources = dataSources.filter(dataSource => dataSource.connected);

    if (!connectedDataSources.length) {
      return;
    }

    const promises = connectedDataSources.map(connectedDataSource => {
      return connectedDataSource.fetch(this.state.filter)
        .then(data => {
          connectedDataSource.data = data;
          dataSources = dataSources.map(dataSource => dataSource.id === connectedDataSource.id ? connectedDataSource : dataSource);
        })
        .catch(console.debug);
    });

    Promise.all(promises).then(() => { this.setState({ dataSources: dataSources }); })
  }

  handleFilterUpdate(filter) {
    this.setState({ filter: filter }, this.getData);
  }

  render() {
    const layerData = this.state.dataSources
      .filter(dataSource => dataSource.connected)
      .map(dataSource => dataSource.normalize(dataSource.data));
    return (
      <div className='app'>
        <div className='app__menu'><Menu items={this.state.dataSources} onFilterUpdate={this.handleFilterUpdate.bind(this)}></Menu></div>
        <div className='app__map'><Map layers={layerData}></Map></div>
      </div>
    );
  }
}

export default App;
