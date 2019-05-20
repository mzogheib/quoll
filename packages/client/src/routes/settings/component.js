import React, { Component } from 'react'
import './style.scss'
import DataSourceSettings from '../../components/DataSourceSettings'
import { requestAuth } from '../../services/oauth'
import AlertModal from '../../components/modals/AlertModal'

const INITIAL_STATE = {
  showModal: false,
  modalMessage: 'Oops, somethign went wrong.',
}

class Settings extends Component {
  state = { ...INITIAL_STATE }

  componentDidMount() {
    const { location, history } = this.props
    const { state } = location
    if (state && state.errorMessage) {
      this.openModal(state.errorMessage)
      // Replace the current location without a state so that this error
      // message doesn't keep getting displayed
      history.replace('/settings')
    }
  }

  openModal = (message = INITIAL_STATE.modalMessage) =>
    this.setState({ showModal: true, modalMessage: message })

  closeModal = () => this.setState({ ...INITIAL_STATE })

  connectDataSource = name => {
    const { onConnect, onOauthCodeReceived } = this.props

    const defaultErrorMessage = 'Could not connect feed. Please try again.'
    const openErrorModal = (message = defaultErrorMessage) =>
      this.openModal(message)

    const onRequestAuthSuccess = code =>
      onOauthCodeReceived(name, code).catch(openErrorModal)

    onConnect(name)
      .then(url => requestAuth(url, onRequestAuthSuccess, openErrorModal))
      .catch(openErrorModal)
  }

  disconnectDataSource = name =>
    this.props
      .onDisconnect(name)
      .then(message => {
        if (message) {
          this.openModal(message)
        }
      })
      .catch(() =>
        this.openModal('Could not disconnect feed. Please try again.')
      )

  render() {
    const { dataSources } = this.props
    const { showModal, modalMessage } = this.state

    const renderDataSource = dataSource => (
      <div className="settings__data-source" key={dataSource.name}>
        <DataSourceSettings
          dataSource={dataSource}
          onConnect={this.connectDataSource}
          onDisconnect={this.disconnectDataSource}
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
        <AlertModal
          isOpen={showModal}
          message={modalMessage}
          onClose={this.closeModal}
        />
      </div>
    )
  }
}

export default Settings
