import React from 'react';
import './style.css';

function FeedSettings(props) {

  function renderButton(feed) {
    return (
      <button onClick={() => feed.isConnected ? props.onDisconnect() : props.onConnect()}>
        {feed.isConnected ? 'Disconnect' : 'Connect'}
      </button>
    )
  }

  function render(feed) {
    return (
      <div className='feed-settings'>
        <div className='feed-settings__logo'></div>
        <div className='feed-settings__info'>
          <div className='feed-settings__name'>{feed.name}</div>
          <a className='feed-settings__url' href={feed.link.url}>{feed.link.label}</a>
        </div>
        <div className='feed-settings__button'>
          {feed.isLoading ? 'Loading...' : renderButton(feed)}
        </div>
      </div>
    )
  }
  
  return render(props.feed);
}

export default FeedSettings;
