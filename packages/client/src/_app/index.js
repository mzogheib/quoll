import React, { Component } from 'react';
import './style.css';
import Menu from '../menu';
import Map from '../map';
import User from '../_utils/user';
import Utils from '../_utils/'
import Feeds from '../feeds';
import Storage from '../_utils/storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleOAuth = this.handleOAuth.bind(this);
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleSelectLine = this.handleSelectLine.bind(this);
    this.state = {
      feeds: [],
      filter: {},
      highlightedItemId: null
    };
  }

  componentDidMount() {
    const userId = User.getCurrentUser();
    const action = userId ? 'login' : 'signup';
    // TODO: if login fails then clear that user from localStorage and signup
    User[action](userId)
      .then(user => {
        User.setCurrentUser(user.id);
        const feeds = Feeds.map(feed => {
          feed.isConnected = user.feeds.find(userFeed => userFeed.id === feed.id).isConnected;
          return feed;
        });
        this.refreshFeeds(feeds, this.state.filter).then(newFeeds => 
          this.setState({ feeds: feeds }, this.handleOAuth))
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

      const feedId = oauthState.id;
      const feeds = this.state.feeds.slice();
      const feed = feeds.find(feed => feed.id === feedId);

      const token = oauthState.token;
      const storedToken = Storage.get('oauth-state-token');
      const tokenIsValid = storedToken && token && storedToken === token;
      Storage.delete('oauth-state-token');

      if (!feed) {
        alert(`Unknown feed: ${feedId}`);
        return;
      } else if (!tokenIsValid || oauthError === 'access_denied') {
        alert(`${feed.name} access denied.`);
        return;
      } else if (oauthCode) {
        feed.authenticate({ code: oauthCode })
          .then(() => feed.getData(this.state.filter))
          .then(() => { this.setState({ feeds: feeds }); })
          .catch(alert)
        } else {
          alert(`Unknown response from ${feed.name}.`);
      }
    }
  }

  refreshFeeds(feeds, filter) {
    const promises = feeds.slice()
      .filter(feed => feed.isConnected)
      .map(connectedFeed => connectedFeed.getData(filter).catch(alert));
    return Promise.all(promises).then(() => feeds);
  }

  handleFilterUpdate(filter) {
    this.refreshFeeds(this.state.feeds, filter).then(feeds => this.setState({ filter, feeds, highlightedItemId: null }));
  }

  handleConnect(id) {
    const feed = this.state.feeds.slice().find(feed => feed.id === id);
    const token = Utils.makeRandomString();
    Storage.set('oauth-state-token', token);
    feed.connect(token);
  }

  handleDisconnect(id) {
    const feeds = this.state.feeds.slice();
    const feed = feeds.find(feed => feed.id === id);
    feed.disconnect()
      .then(() => { this.setState({ feeds: feeds }); })
      .catch(alert);
  }

  handleSelectLine(line) {
    this.setState({ highlightedItemId: line.id });
  }

  render() {
    const markerDataLayers = this.state.feeds
      .filter(feed => feed.isConnected)
      .filter(feed => feed.isMarker)
      .map(feed => feed.makeMapData(feed.data));
    const polylineDataLayers = this.state.feeds
      .filter(feed => feed.isConnected)
      .filter(feed => feed.isPolyline)
      .map(feed => feed.makeMapData(feed.data));
    return (
      <div className='app'>
        <div className='app__menu'>
          <Menu
            items={this.state.feeds}
            onFilterUpdate={this.handleFilterUpdate}
            onConnect={this.handleConnect}
            onDisconnect={this.handleDisconnect}
            onSelectLine={this.handleSelectLine}
          />
        </div>
        <div className='app__map-wrapper'>
          <div className='app__map'>
            <Map
              markerDataLayers={markerDataLayers}
              polylineDataLayers={polylineDataLayers}
              highlightedItemId={this.state.highlightedItemId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
