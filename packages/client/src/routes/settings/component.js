import React from 'react'
import './style.scss'
import DataSourceSettings from '../../components/data-source-settings'
import { requestAuth } from '../../services/oauth'

const Settings = ({
  onConnect,
  onDisconnect,
  onOauthCodeReceived,
  dataSources,
}) => {
  const connectDataSource = name =>
    onConnect(name)
      .then(url =>
        requestAuth({ url, name }, ({ dataSourceName, oauthCode, error }) => {
          // TODO: replace these alerts with non-blocking modals.
          if (error) return alert(error)

          const dataSource = dataSources.find(ds => ds.name === dataSourceName)
          if (!dataSource)
            return alert(`Unknown data source: ${dataSourceName}`)

          return onOauthCodeReceived(dataSourceName, oauthCode).catch(alert)
        })
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
