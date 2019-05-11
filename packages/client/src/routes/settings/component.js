import React from 'react'
import './style.scss'
import DataSourceSettings from '../../components/data-source-settings'
import utils from '../../services/utils'
import storageService from '../../services/storage'

const Settings = ({
  onConnect,
  onDisconnect,
  onOauthCodeReceived,
  dataSources,
}) => {
  const connectDataSource = name => {
    onConnect(name)
      .then(url => {
        const token = utils.makeRandomString()
        storageService.set('oauth-state-token', token)
        const stateString = utils.encode({ name, token })
        const urlWithState = utils.addQueryParams(url, { state: stateString })

        window.open(urlWithState)
        window.quollOnOAuthSuccess = response => {
          if (response && response.state) {
            const oauthState = utils.decode(response.state)
            const oauthCode = response.code
            const oauthError = response.error

            const dataSourceName = oauthState.name
            const dataSource = dataSources.find(
              dataSource => dataSource.name === dataSourceName
            )

            const token = oauthState.token
            const storedToken = storageService.get('oauth-state-token')
            const tokenIsValid = storedToken && token && storedToken === token
            storageService.delete('oauth-state-token')

            // TODO: replace these alerts with non-blocking modals.
            if (!dataSource) {
              return alert(`Unknown data source: ${dataSourceName}`)
            } else if (!tokenIsValid || oauthError === 'access_denied') {
              return alert(`${dataSource.name} access denied.`)
            } else if (oauthCode) {
              return onOauthCodeReceived(dataSourceName, oauthCode)
                .then(() => {
                  delete window.quollOnOAuthSuccess
                })
                .catch(alert)
            } else {
              return alert(`Unknown response from ${dataSource.name}.`)
            }
          }
          // Else do nothing.
        }
      })
      .catch(alert)
  }

  const disconnectDataSource = name => {
    onDisconnect(name)
      .then(alertText => {
        if (alertText) {
          alert(alertText)
        }
      })
      .catch(alert)
  }

  const renderDataSource = dataSource => (
    <div className="settings__data-source" key={dataSource.name}>
      <DataSourceSettings
        dataSource={dataSource}
        onConnect={() => connectDataSource(dataSource.name)}
        onDisconnect={() => disconnectDataSource(dataSource.name)}
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
