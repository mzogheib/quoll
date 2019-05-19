import React from 'react'
import './style.scss'
import DataSourceSettings from '../../components/data-source-settings'
import { requestAuth } from '../../services/oauth'

const Settings = ({
  onConnect,
  onDisconnect,
  onOauthCodeReceived,
  dataSources,
  location,
  history,
}) => {
  const { state } = location
  if (state && state.errorMessage) {
    alert(state.errorMessage)
    // Replace the current location without a state so that this error
    // message doesn't keep getting displayed
    history.replace('/settings')
  }

  const connectDataSource = name =>
    onConnect(name)
      .then(url =>
        requestAuth(
          url,
          code => onOauthCodeReceived(name, code).catch(alert),
          alert
        )
      )
      .catch(alert)

  const disconnectDataSource = name =>
    onDisconnect(name)
      .then(alertText => {
        if (alertText) {
          alert(alertText)
        }
      })
      .catch(alert)

  const renderDataSource = dataSource => (
    <div className="settings__data-source" key={dataSource.name}>
      <DataSourceSettings
        dataSource={dataSource}
        onConnect={connectDataSource}
        onDisconnect={disconnectDataSource}
      />
    </div>
  )

  return (
    <div className="settings">
      <div className="settings__data-sources">
        <div className="settings__data-sources-title">Feeds</div>
        <div className="settings__data-sources-list">
          {dataSources.map(renderDataSource)}
        </div>
      </div>
    </div>
  )
}

export default Settings
