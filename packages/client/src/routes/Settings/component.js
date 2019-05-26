import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FeedSettings from '../../components/FeedSettings'
import { requestAuth } from '../../services/oauth'
import AlertModal from '../../components/modals/AlertModal'
import './style.scss'

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

  connectFeed = name => {
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

  disconnectFeed = name =>
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
    const { feeds } = this.props
    const { showModal, modalMessage } = this.state

    const renderFeed = feed => (
      <div className="settings__feed" key={feed.name}>
        <FeedSettings
          feed={feed}
          onConnect={this.connectFeed}
          onDisconnect={this.disconnectFeed}
        />
      </div>
    )

    return (
      <div className="settings">
        <div className="settings__feeds">
          <div className="settings__feeds-title">Feeds</div>
          <div className="settings__feeds-list">{feeds.map(renderFeed)}</div>
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

Settings.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      errorMessage: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }),
  feeds: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onConnect: PropTypes.func.isRequired,
  onOauthCodeReceived: PropTypes.func.isRequired,
}

export default Settings
