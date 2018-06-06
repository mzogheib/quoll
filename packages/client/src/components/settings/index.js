import React from 'react';
import './style.css';
import feedsService from '../../services/feeds';
import feedsConfig from '../../services/feeds-config';
import utils from '../../services/utils'
import storageService from '../../services/storage';

function Settings(props) {
  const feedServices = feedsConfig.map(feedsService.make);

  function connectFeed(id) {
    const feedService = feedServices.find(feed => feed.id === id);
    const token = utils.makeRandomString();
    storageService.set('oauth-state-token', token);
    feedService.connect(token);
  }

  function disconnectFeed(id) {
    const feedService = feedServices.find(feed => feed.id === id);
    const feed = props.feeds.find(feed => feed.id === id);
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
        const updatedFeeds = props.feeds.map(feed => feed.id === disconnectedFeed.id ? disconnectedFeed : feed);
        props.setFeeds(updatedFeeds)
      })
      .catch(alert);
  }

  function renderFeed(feed) {
    return (
      <div className='settings__feeds' key={feed.id}>
        <div>{feed.name}</div>
        <button onClick={() => feed.isConnected ? disconnectFeed(feed.id) : connectFeed(feed.id)}>
          {feed.isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>
    )
  }

  return (
    <div className='settings'>
      Settings
      {props.feeds.map(renderFeed)}
    </div>
  );
}

export default Settings;
