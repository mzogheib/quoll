import React from 'react';
import './style.css';
import Loader from '../horizontal-loader';

function FeedSettings(props) {

  function handleButtonClick(feed) {
    if (feed.isLoading) {
      return;
    } else {
      return feed.isConnected ? props.onDisconnect() : props.onConnect();
    }
  }

  function renderButton(feed) {
    return (
      <a className={feed.isLoading ? 'feed-settings__connect-disabled' : 'feed-settings__connect'} onClick={() => handleButtonClick(feed)}>
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
        <div>{renderButton(feed)}</div>
        {feed.isLoading && (<div className='feed-settings__loader'><Loader/></div>)}
      </div>
    )
  }

  return render(props.feed);
}

export default FeedSettings;
