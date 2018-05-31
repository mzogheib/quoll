import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Menu from '../menu';
import Map from '../map';
import userService from '../../services/user';
import utils from '../../services/utils'
import feedsService from '../../services/feeds';
import feedsConfig from '../../services/feeds-config';
import storageService from '../../services/storage';

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
      focussedItemId: null
    };
  }

  componentDidMount() {
    const userId = userService.getCurrentUser();
    const action = userId ? 'login' : 'signup';
    // TODO: if login fails then clear that user from localStorage and signup
    userService[action](userId)
      .then(user => {
        userService.setCurrentUser(user.id);
        const feeds = feedsConfig.map(feedsService.make).map(feed => {
          const userFeed = user.feeds.find(userFeed => userFeed.id === feed.id);
          feed.isConnected = userFeed ? userFeed.isConnected : false;
          return feed;
        });
        this.refreshFeeds(feeds, this.props.filter).then(newFeeds => 
          this.setState({ feeds: feeds }, this.handleOAuth))
      });
  }

  componentWillReceiveProps(nextProps) {
    this.handleFilterUpdate(nextProps.filter);
  }

  handleOAuth() {
    const queryParams = utils.getQueryParams(window.location.href);
    
    if (!queryParams || !queryParams.state) {
      return;
    } else {
      // Looks like oauth so remove the query params
      window.history.replaceState(null, null, window.location.pathname);
      const oauthState = utils.decode(queryParams.state);
      const oauthCode = queryParams.code;
      const oauthError = queryParams.error;

      const feedId = oauthState.id;
      const feeds = this.state.feeds.slice();
      const feed = feeds.find(feed => feed.id === feedId);

      const token = oauthState.token;
      const storedToken = storageService.get('oauth-state-token');
      const tokenIsValid = storedToken && token && storedToken === token;
      storageService.delete('oauth-state-token');

      if (!feed) {
        alert(`Unknown feed: ${feedId}`);
        return;
      } else if (!tokenIsValid || oauthError === 'access_denied') {
        alert(`${feed.name} access denied.`);
        return;
      } else if (oauthCode) {
        feed.authenticate({ code: oauthCode })
          .then(() => feed.getData(this.props.filter))
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
    this.refreshFeeds(this.state.feeds, filter).then(feeds => this.setState({ feeds, focussedItemId: null }));
  }

  handleConnect(id) {
    const feed = this.state.feeds.slice().find(feed => feed.id === id);
    const token = utils.makeRandomString();
    storageService.set('oauth-state-token', token);
    feed.connect(token);
  }

  handleDisconnect(id) {
    const feeds = this.state.feeds.slice();
    const feed = feeds.find(feed => feed.id === id);
    feed.disconnect()
      .then(alertText => {
        this.setState({ feeds: feeds });
        if (alertText) {
          alert(alertText);
        }
      })
      .catch(alert);
  }

  handleSelectLine(line) {
    this.setState({ focussedItemId: line.id });
  }

  render() {
    const markerData = this.state.feeds
      .filter(feed => feed.isConnected)
      .filter(feed => feed.isMarker)
      .map(feed => feed.makeMapData(feed.data))
      .reduce((prev, next) => prev.concat(next), []);
    const polylineData = this.state.feeds
      .filter(feed => feed.isConnected)
      .filter(feed => feed.isPolyline)
      .map(feed => feed.makeMapData(feed.data))
      .reduce((prev, next) => prev.concat(next), []);

    return (
      <div className='app'>
        <div className='app__menu'>
          <Menu
            items={this.state.feeds}
            onConnect={this.handleConnect}
            onDisconnect={this.handleDisconnect}
            onSelectLine={this.handleSelectLine}
          />
        </div>
        <div className='app__map-wrapper'>
          <div className='app__map'>
            <Map
              markerData={markerData}
              polylineData={polylineData}
              focussedItemId={this.state.focussedItemId}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.filter
});

export default connect(mapStateToProps)(App);
