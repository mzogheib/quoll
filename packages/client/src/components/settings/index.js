import React from 'react';
import './style.css';
import feedsService from '../../services/feeds';
import feedsConfig from '../../services/feeds-config';
import utils from '../../services/utils'
import storageService from '../../services/storage';

function Settings(props) {
  const feedServices = feedsConfig.map(feedsService.make);

  handleOAuth()

  function handleOAuth() {
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
      const feedService = feedServices.find(feed => feed.id === feedId);
      const feed = props.feeds.find(feed => feed.id === feedId);

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
          .then(() => ({
            ...feed,
            isConnected: true
          }))
          .then(connectedFeed => props.feeds.map(feed => feed.id === connectedFeed.id ? connectedFeed : feed))
          .then(props.setFeeds)
          .catch(alert)
        } else {
          alert(`Unknown response from ${feed.name}.`);
      }
    }
  }

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
          data: [],
          mapData: []
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
