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
    this.setState({ dataSources: dataSources }, this.handleOAuth);
  }

  getDataSources() {
    return [
      {
        id: 'toshl',
        name: 'Toshl',
        isConnected: false,
        data: [],
        connect: () => { window.location.replace(Toshl.oAuthUrl); },
        authenticate: Toshl.authenticate,
        disconnect: Toshl.deauthorize,
        fetch: Toshl.getEntries,
        normalize: Toshl.getMarkersFromEntries
      },
      {
        id: 'strava',
        name: 'Strava',
        isConnected: false,
        data: [],
        connect: () => { window.location.replace(Strava.oAuthUrl); },
        authenticate: Strava.authenticate,
        disconnect: Strava.deauthorize,
        fetch: Strava.getActivities,
        normalize: Strava.getPolylinesFromActivities
      }
    ];
  }

  handleOAuth() {
    const queryParams = Utils.parseQueryParams(window.location.search);
    const dataSourceIds = this.state.dataSources.map(ds => ds.id);
    const dataSourceId = queryParams && queryParams.state;

    if (dataSourceIds.includes(dataSourceId)) {
      // Remove the query params. 
      window.history.replaceState(null, null, window.location.pathname);

      const dataSources = this.state.dataSources.slice();
      const dataSource = dataSources.find(ds => ds.id === dataSourceId);

      if (queryParams.code) {
        dataSource.authenticate({ code: queryParams.code })
          .then(() => dataSource.fetch(this.state.filter))
          .then(data => {
            dataSource.data = data;
            dataSource.isConnected = true;
            this.setState({ dataSources: dataSources });
          })
          .catch(console.debug)
      } else if (queryParams.error && queryParams.error === 'access_denied') {
        console.debug(`${dataSource.name} access denied.`);
      } else {
        console.debug(`Unknown response from ${dataSource.name}.`);
      }
    } else {
      console.debug(`Unknown data source: ${dataSourceId}`);
    }
  }

  getData() {
    let dataSources = this.state.dataSources.slice();
    const connectedDataSources = dataSources.filter(dataSource => dataSource.isConnected);

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

  handleConnect(id) {
    const dataSources = this.state.dataSources.slice();
    const dataSource = dataSources.find(ds => ds.id === id);
    dataSource.connect();
  }

  handleDisconnect(id) {
    const dataSources = this.state.dataSources.slice();
    const dataSource = dataSources.find(ds => ds.id === id);
    dataSource.disconnect()
      .then(() => {
        dataSource.data = [];
        dataSource.isConnected = false;
        this.setState({ dataSources: dataSources });
      })
      .catch(console.debug);
  }

  render() {
    const layerData = this.state.dataSources
      .filter(dataSource => dataSource.isConnected)
      .map(dataSource => dataSource.normalize(dataSource.data));
    return (
      <div className='app'>
        <div className='app__menu'>
          <Menu
            items={this.state.dataSources}
            onFilterUpdate={this.handleFilterUpdate.bind(this)}
            onConnect={this.handleConnect.bind(this)}
            onDisconnect={this.handleDisconnect.bind(this)}
          />
        </div>
        <div className='app__map'><Map layers={layerData}></Map></div>
      </div>
    );
  }
}

export default App;
