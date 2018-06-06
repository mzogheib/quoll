import React from 'react';
import './style.css';

function Settings(props) {

  function renderFeed(feed) {
    return (
      <div className='settings__feeds' key={feed.id}>
        <div>{feed.name}</div>
        <button onClick={() => feed.isConnected ? props.disconnectFeed(feed.id) : props.connectFeed(feed.id)}>
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
