import React, { Component } from 'react'
import './style.scss'
import DataSourceSettings from '../../components/data-source-settings'
import utils from '../../services/utils'
import storageService from '../../services/storage'

class Settings extends Component {
  connectDataSource = name => {
    this.props
      .onConnect(name)
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
            const dataSource = this.props.dataSources.find(
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
              return this.props
                .onOauthCodeReceived(dataSourceName, oauthCode)
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

  disconnectDataSource = name => {
    this.props
      .onDisconnect(name)
      .then(alertText => {
        if (alertText) {
          alert(alertText)
        }
      })
      .catch(alert)
  }

  renderDataSource = dataSource => (
    <div className="settings__data-source" key={dataSource.name}>
      <DataSourceSettings
        dataSource={dataSource}
        onConnect={() => this.connectDataSource(dataSource.name)}
        onDisconnect={() => this.disconnectDataSource(dataSource.name)}
      />
    </div>
  )

  render() {
    return (
      <div className="settings">
        <div className="settings__data-sources">
          <div className="settings__data-sources-title">Feeds</div>
          <div className="settings__data-sources-list">
            {this.props.dataSources.map(this.renderDataSource)}
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
