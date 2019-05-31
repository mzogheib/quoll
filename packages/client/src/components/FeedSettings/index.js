import React from 'react'
import PropTypes from 'prop-types'

import Loader from '../HorizontalLoader'
import Button from '../Button'
import './index.scss'

const FeedSettings = ({ feed, onConnect, onDisconnect }) => {
  const {
    isAuthenticating,
    isConnected,
    imageConnected,
    imageDisconnected,
    name,
    title,
    link,
  } = feed
  const imgSrc = isConnected ? imageConnected : imageDisconnected

  const handleButtonClick = () => {
    if (isAuthenticating) {
      return
    }
    return isConnected ? onDisconnect(name) : onConnect(name)
  }

  return (
    <div className="feed-settings">
      <div className="feed-settings__logo">
        <img src={imgSrc} alt={`${name} logo`} />
      </div>
      <div className="feed-settings__info">
        <div className="feed-settings__title">{title}</div>
        <a
          className="feed-settings__url"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      </div>
      <Button.Plain
        label={isConnected ? 'Disconnect' : 'Connect'}
        onClick={handleButtonClick}
        disabled={isAuthenticating}
      />
      {isAuthenticating && (
        <div className="feed-settings__loader">
          <Loader />
        </div>
      )}
    </div>
  )
}

FeedSettings.propTypes = {
  feed: PropTypes.shape({
    isAuthenticating: PropTypes.bool.isRequired,
    isConnected: PropTypes.bool.isRequired,
    imageConnected: PropTypes.string.isRequired,
    imageDisconnected: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.shape({
      url: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onConnect: PropTypes.func.isRequired,
  onDisconnect: PropTypes.func.isRequired,
}

export default FeedSettings
