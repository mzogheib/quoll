import React, { Component } from 'react'
import './style.scss'
import DataSourceSettings from '../../components/data-source-settings'
import utils from '../../services/utils'
import storageService from '../../services/storage'
import querystring from 'querystring'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.renderDataSource = this.renderDataSource.bind(this)
  }

  componentDidMount() {
    this.handleOAuth()
  }

  handleOAuth() {
    const searchString = this.props.location.search
    // searchString: ?foo=bar
    const queryParams = querystring.parse(searchString.substr(1))

    if (queryParams && queryParams.state) {
      // Looks like oauth so remove the query params
      window.history.replaceState(null, null, window.location.pathname)
      const oauthState = utils.decode(queryParams.state)
      const oauthCode = queryParams.code
      const oauthError = queryParams.error

      const dataSourceName = oauthState.name
      const dataSource = this.props.dataSources.find(
        dataSource => dataSource.name === dataSourceName
      )

      const token = oauthState.token
      const storedToken = storageService.get('oauth-state-token')
      const tokenIsValid = storedToken && token && storedToken === token
      storageService.delete('oauth-state-token')

      if (!dataSource) {
        return alert(`Unknown data source: ${dataSourceName}`)
      } else if (!tokenIsValid || oauthError === 'access_denied') {
        return alert(`${dataSource.name} access denied.`)
      } else if (oauthCode) {
        return this.props
          .onOauthCodeReceived(dataSourceName, oauthCode)
          .catch(alert)
      } else {
        return alert(`Unknown response from ${dataSource.name}.`)
      }
    }
  }

  connectDataSource(name) {
    this.props
      .onConnect(name)
      .then(url => {
        const token = utils.makeRandomString()
        storageService.set('oauth-state-token', token)
        const stateString = utils.encode({ name, token })
        const urlWithState = utils.addQueryParams(url, { state: stateString })
        window.location.href = urlWithState
      })
      .catch(alert)
  }

  disconnectDataSource(name) {
    this.props
      .onDisconnect(name)
      .then(alertText => {
        if (alertText) {
          alert(alertText)
        }
      })
      .catch(alert)
  }

  renderDataSource(dataSource) {
    return (
      <div className="settings__data-source" key={dataSource.name}>
        <DataSourceSettings
          dataSource={dataSource}
          onConnect={() => this.connectDataSource(dataSource.name)}
          onDisconnect={() => this.disconnectDataSource(dataSource.name)}
        />
      </div>
    )
  }

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
