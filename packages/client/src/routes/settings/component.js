import React from 'react';
import './style.css';
import FeedSettings from '../../components/feed-settings';
import utils from '../../services/utils';
import storageService from '../../services/storage';

function Settings(props) {

  handleOAuth()

  function handleOAuth() {
    const queryParams = utils.getQueryParams(window.location.href);
    
    if (queryParams && queryParams.state) {
      // Looks like oauth so remove the query params
      window.history.replaceState(null, null, window.location.pathname);
      const oauthState = utils.decode(queryParams.state);
      const oauthCode = queryParams.code;
      const oauthError = queryParams.error;

      const feedId = oauthState.id;
      const feed = props.feeds.find(feed => feed.id === feedId);

      const token = oauthState.token;
      const storedToken = storageService.get('oauth-state-token');
      const tokenIsValid = storedToken && token && storedToken === token;
      storageService.delete('oauth-state-token');

      if (!feed) {
        return alert(`Unknown feed: ${feedId}`);
      } else if (!tokenIsValid || oauthError === 'access_denied') {
        return alert(`${feed.name} access denied.`);
      } else if (oauthCode) {
        return props.onOauthCodeReceived(feedId, oauthCode).catch(alert);
      } else {
        return alert(`Unknown response from ${feed.name}.`);
      }
    }
  }

  function connectFeed(id) {
    props.onConnect(id).then(url => {
      const token = utils.makeRandomString();
      storageService.set('oauth-state-token', token);
      const stateString = utils.encode({ id, token });
      const urlWithState = utils.addQueryParams(url, { state: stateString });
      window.location.replace(urlWithState);
    });
  }

  function disconnectFeed(id) {
    props.onDisconnect(id)
      .then(alertText => {
        if (alertText) {
          alert(alertText);
        }
      })
      .catch(alert);
  }

  function renderFeed(feed) {
    return (
      <div className='settings__feed' key={feed.id}>
        <FeedSettings
          feed={feed}
          onConnect={() => connectFeed(feed.id)}
          onDisconnect={() => disconnectFeed(feed.id)}
        />
      </div>
    )
  }

  return (
    <div className='settings'>
      <div className='settings__feeds'>
        <div className='settings__feeds-title'>Feeds</div>
        <div className='settings__feeds-list'>
          {props.feeds.map(renderFeed)}
        </div>
      </div>
    </div>
  );
}

export default Settings;
