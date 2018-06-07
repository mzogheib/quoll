import React, { Component } from 'react';
import './style.css';
import Menu from '../menu';
import Map from '../map';
import feedsService from '../../services/feeds';
import feedsConfig from '../../services/feeds-config';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.feedServices = feedsConfig.map(feedsService.make);
  }

  componentDidMount() {
    this.refreshFeeds(this.props.feeds, this.props.date)
      .then(this.props.setFeeds);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.handleFilterUpdate(nextProps.date);
    }
  };

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
      summaryList: feedService.makeSummaryList(data),
      mapData: feedService.makeMapData(data)
    }));
  }

  handleFilterUpdate(date) {
    this.refreshFeeds(this.props.feeds, date)
      .then(this.props.setFeeds)
      .then(() => this.props.setFocussedItem(null));
  }

  render() {
    const connectedMarkerFeeds = this.props.feeds
      .filter(feed => feed.isConnected)
      .filter(feed => feed.isMarker);
    const markerData = connectedMarkerFeeds
      .map(feed => feed.mapData)
      .reduce((prev, next) => prev.concat(next), []);

    const connectedPolylineFeeds = this.props.feeds
      .filter(feed => feed.isConnected)
      .filter(feed => feed.isPolyline);
    const polylineData = connectedPolylineFeeds
      .map(feed => feed.mapData)
      .reduce((prev, next) => prev.concat(next), []);

    return (
      <div className='app'>
        <div className='app__menu'>
          <Menu
            items={this.props.feeds}
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

export default App;
