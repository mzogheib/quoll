import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Menu from '../menu';
import Map from '../map';
import utils from '../../services/utils'
import feedsService from '../../services/feeds';
import feedsConfig from '../../services/feeds-config';
import storageService from '../../services/storage';
import { setFocussedItem, setFeeds } from '../../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleOAuth = this.handleOAuth.bind(this);
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.feedServices = feedsConfig.map(feedsService.make);
  }

  componentDidMount() {
    this.refreshFeeds(this.props.feeds, this.props.date)
      .then(this.props.setFeeds)
      .then(this.handleOAuth);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.handleFilterUpdate(nextProps.date);
    }
  };

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
      const feedService = this.feedServices.find(feed => feed.id === feedId);
      const feed = this.props.feeds.find(feed => feed.id === feedId);

      const token = oauthState.token;
      const storedToken = storageService.get('oauth-state-token');
      const tokenIsValid = storedToken && token && storedToken === token;
      storageService.delete('oauth-state-token');

      if (!feedService || !feed) {
        alert(`Unknown feed: ${feedId}`);
        return;
      } else if (!tokenIsValid || oauthError === 'access_denied') {
        alert(`${feedService.name} access denied.`);
        return;
      } else if (oauthCode) {
        feedService.authenticate({ code: oauthCode })
          .then(() => this.refreshFeed(feed, this.props.date))
          .then(refreshedFeed => ({
            ...refreshedFeed,
            isConnected: true
          }))
          .then(refreshedFeed => this.props.feeds.map(feed => feed.id === refreshedFeed.id ? refreshedFeed : feed))
          .then(this.props.setFeeds)
          .catch(alert)
        } else {
          alert(`Unknown response from ${feed.name}.`);
      }
    }
  }

  refreshFeeds(feeds, date) {
    const promises = feeds.map(feed => feed.isConnected ? this.refreshFeed(feed, date) : Promise.resolve(feed))
    return Promise.all(promises);
  }

  refreshFeed(feed, date) {
    const feedService = this.feedServices.find(feedService => feedService.id === feed.id);
    return feedService.getData(date).then(data => ({
      ...feed,
      data: data,
      summary: feedService.makeSummary(data),
      summaryList: feedService.makeSummaryList(data)
    }));
  }

  handleFilterUpdate(date) {
    this.refreshFeeds(this.props.feeds, date)
      .then(this.props.setFeeds)
      .then(() => this.props.setFocussedItem(null));
  }

  handleConnect(id) {
    const feedService = this.feedServices.find(feed => feed.id === id);
    const token = utils.makeRandomString();
    storageService.set('oauth-state-token', token);
    feedService.connect(token);
  }

  handleDisconnect(id) {
    const feedService = this.feedServices.find(feed => feed.id === id);
    const feed = this.props.feeds.find(feed => feed.id === id);
    feedService.disconnect()
      .then(alertText => {
        if (alertText) {
          alert(alertText);
        }
        const disconnectedFeed = {
          ...feed,
          isConnected: false,
          summary: 'None',
          summaryList: [],
        };
        const updatedFeeds = this.props.feeds.map(feed => feed.id === disconnectedFeed.id ? disconnectedFeed : feed);
        this.props.setFeeds(updatedFeeds)
      })
      .catch(alert);
  }

  render() {
    const connectedMarkerFeeds = this.props.feeds
      .filter(feed => feed.isConnected)
      .filter(feed => feed.isMarker);
    const markerData = connectedMarkerFeeds
      .map(feed => this.feedServices.find(fs => fs.id === feed.id).makeMapData(feed.data))
      .reduce((prev, next) => prev.concat(next), []);

    const connectedPolylineFeeds = this.props.feeds
      .filter(feed => feed.isConnected)
      .filter(feed => feed.isPolyline);
    const polylineData = connectedPolylineFeeds
      .map(feed => this.feedServices.find(fs => fs.id === feed.id).makeMapData(feed.data))
      .reduce((prev, next) => prev.concat(next), []);

    return (
      <div className='app'>
        <div className='app__menu'>
          <Menu
            items={this.props.feeds}
            onConnect={this.handleConnect}
            onDisconnect={this.handleDisconnect}
          />
        </div>
        <div className='app__map-wrapper'>
          <div className='app__map'>
            <Map
              markerData={markerData}
              polylineData={polylineData}
              focussedItemId={this.props.focussedItemId}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  setFocussedItem: id => dispatch(setFocussedItem(id)),
  setFeeds: feeds => dispatch(setFeeds(feeds))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
