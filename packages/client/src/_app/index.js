import React, { Component } from 'react';
import './style.css';
import Menu from '../menu';
import Map from '../map';
import User from '../_utils/user';
import Utils from '../_utils/'
import DataSources from '../data-sources';
import Storage from '../_utils/storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleOAuth = this.handleOAuth.bind(this);
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.state = {
      dataSources: [],
      filter: {}
    };
  }

  componentDidMount() {
    const userId = User.getCurrentUser();
    const action = userId ? 'login' : 'signup';
    // TODO: if login fails then clear that user from localStorage and signup
    User[action](userId)
      .then(user => {
        User.setCurrentUser(user.id);
        const dataSources = DataSources.map(ds => {
          ds.isConnected = user.dataSources.find(uds => uds.id === ds.id).isConnected;
          return ds;
        });
        this.refreshDataSources(dataSources, this.state.filter).then(newDataSources => 
          this.setState({ dataSources: dataSources }, this.handleOAuth))
      });
  }

  handleOAuth() {
    const queryParams = Utils.getQueryParams(window.location.href);
    
    if (!queryParams || !queryParams.state) {
      return;
    } else {
      // Looks like oauth so remove the query params
      window.history.replaceState(null, null, window.location.pathname);
      const oauthState = Utils.decode(queryParams.state);
      const oauthCode = queryParams.code;
      const oauthError = queryParams.error;

      const dataSourceId = oauthState.id;
      const dataSourceIds = this.state.dataSources.map(ds => ds.id);
      const knownDataSource = dataSourceIds.includes(dataSourceId);
      const dataSources = this.state.dataSources.slice();
      const dataSource = knownDataSource ? dataSources.find(ds => ds.id === dataSourceId) : null;

      const token = oauthState.token;
      const storedToken = Storage.get('oauth-state-token');
      const tokenIsValid = storedToken && token && storedToken === token;
      Storage.delete('oauth-state-token');

      if (!knownDataSource) {
        alert(`Unknown data source: ${dataSourceId}`);
        return;
      } else if (!tokenIsValid || oauthError === 'access_denied') {
        alert(`${dataSource.name} access denied.`);
        return;
      } else if (oauthCode) {
        dataSource.authenticate({ code: queryParams.code })
          .then(() => dataSource.getData(this.state.filter))
          .then(() => { this.setState({ dataSources: dataSources }); })
          .catch(alert)
        } else {
          alert(`Unknown response from ${dataSource.name}.`);
      }
    }
  }

  refreshDataSources(dataSources, filter) {
    const promises = dataSources.slice()
      .filter(dataSource => dataSource.isConnected)
      .map(connectedDataSource => connectedDataSource.getData(filter).catch(alert));
    return Promise.all(promises).then(() => dataSources);
  }

  handleFilterUpdate(filter) {
    this.refreshDataSources(this.state.dataSources, filter).then(dataSources => this.setState({ filter: filter, dataSources: dataSources}));
  }

  handleConnect(id) {
    const dataSource = this.state.dataSources.slice().find(ds => ds.id === id);
    const token = Utils.makeRandomString();
    Storage.set('oauth-state-token', token);
    dataSource.connect(token);
  }

  handleDisconnect(id) {
    const dataSources = this.state.dataSources.slice();
    const dataSource = dataSources.find(ds => ds.id === id);
    dataSource.disconnect()
      .then(() => { this.setState({ dataSources: dataSources }); })
      .catch(alert);
  }

  render() {
    const markerDataLayers = this.state.dataSources
      .filter(dataSource => dataSource.isConnected)
      .filter(dataSource => dataSource.isMarker)
      .map(dataSource => dataSource.makeMapData(dataSource.data));
    const polylineDataLayers = this.state.dataSources
      .filter(dataSource => dataSource.isConnected)
      .filter(dataSource => dataSource.isPolyline)
      .map(dataSource => dataSource.makeMapData(dataSource.data));
    return (
      <div className='app'>
        <div className='app__menu'>
          <Menu
            items={this.state.dataSources}
            onFilterUpdate={this.handleFilterUpdate}
            onConnect={this.handleConnect}
            onDisconnect={this.handleDisconnect}
          />
        </div>
        <div className='app__map-wrapper'>
          <div className='app__map'>
            <Map markerDataLayers={markerDataLayers} polylineDataLayers={polylineDataLayers}></Map>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
