import React from 'react'
import './style.scss'
import Loader from '../HorizontalLoader'

const DataSourceSettings = ({ dataSource, onConnect, onDisconnect }) => {
  const {
    isAuthenticating,
    isConnected,
    imageConnected,
    imageDisconnected,
    name,
    title,
    link,
  } = dataSource
  const imgSrc = isConnected ? imageConnected : imageDisconnected

  const handleButtonClick = () => {
    if (isAuthenticating) {
      return
    }
    return isConnected ? onDisconnect(name) : onConnect(name)
  }

  return (
    <div className="data-source-settings">
      <div className="data-source-settings__logo">
        <img src={imgSrc} alt={`${name} logo`} />
      </div>
      <div className="data-source-settings__info">
        <div className="data-source-settings__title">{title}</div>
        <a
          className="data-source-settings__url"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      </div>
      <div
        className={
          isAuthenticating
            ? 'data-source-settings__connect-disabled'
            : 'data-source-settings__connect'
        }
        onClick={handleButtonClick}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </div>
      {isAuthenticating && (
        <div className="data-source-settings__loader">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default DataSourceSettings
