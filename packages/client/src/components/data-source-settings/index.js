import React from 'react'
import './style.scss'
import Loader from '../horizontal-loader'

const DataSourceSettings = ({ dataSource, onConnect, onDisconnect }) => {
  const handleButtonClick = dataSource => {
    if (dataSource.isAuthenticating) {
      return
    } else {
      return dataSource.isConnected ? onDisconnect() : onConnect()
    }
  }

  const renderButton = dataSource => (
    <div
      className={
        dataSource.isAuthenticating
          ? 'data-source-settings__connect-disabled'
          : 'data-source-settings__connect'
      }
      onClick={() => handleButtonClick(dataSource)}
    >
      {dataSource.isConnected ? 'Disconnect' : 'Connect'}
    </div>
  )

  const render = dataSource => (
    <div className="data-source-settings">
      <div className="data-source-settings__logo">
        <img
          src={
            dataSource.isConnected
              ? dataSource.imageConnected
              : dataSource.imageDisconnected
          }
          alt={`${dataSource.name} logo`}
        />
      </div>
      <div className="data-source-settings__info">
        <div className="data-source-settings__name">{dataSource.title}</div>
        <a
          className="data-source-settings__url"
          href={dataSource.link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {dataSource.link.label}
        </a>
      </div>
      {renderButton(dataSource)}
      {dataSource.isAuthenticating && (
        <div className="data-source-settings__loader">
          <Loader />
        </div>
      )}
    </div>
  )

  return render(dataSource)
}

export default DataSourceSettings
