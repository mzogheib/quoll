import React from 'react';
import './style.css';

function FeedSettings(props) {

  function renderLoading() {
    return (
      <div className='feed-settings__connect'>Loading...</div>
    );
  }

  function renderButton(feed) {
    return (
      <a
        className='feed-settings__connect'
        onClick={() => feed.isConnected ? props.onDisconnect() : props.onConnect()}
      >
        {feed.isConnected ? 'Disconnect' : 'Connect'}
      </a>
    )
  }

  function render(feed) {
    const imgStyle = !feed.isConnected ? { filter: 'grayscale(100%)' } : {};
    return (
      <div className='feed-settings'>
        <div className='feed-settings__logo'>
          <img src={feed.image} alt='feed logo' style={imgStyle} />
        </div>
        <div className='feed-settings__info'>
          <div className='feed-settings__name'>{feed.name}</div>
          <a className='feed-settings__url' href={feed.link.url} target='_blank'>{feed.link.label}</a>
        </div>
        <div>
          {feed.isLoading ? renderLoading() : renderButton(feed)}
        </div>
      </div>
    )
  }

  return render(props.feed);
}

export default FeedSettings;
