import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getOauthUrl,
  authenticateFeed,
  disconnectFeed,
} from '../../store/feeds'
import FeedSettings from '../../components/FeedSettings'
import { requestAuth } from '../../services/oauth'
import AlertModal from '../../components/modals/AlertModal'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
`

const Feeds = styled.div`
  width: 100%;
  max-width: 600px;
`

const FeedsTitle = styled.div`
  font-weight: bold;
  font-size: 28px;
`

const FeedsList = styled.div`
  display: flex;
  flex-direction: column;
`

const FeedSettingsWrapper = styled.div`
  margin: 40px 0 0;
`

const INITIAL_STATE = {
  showModal: false,
  modalMessage: 'Oops, something went wrong.',
}

const Settings = (props) => {
  const [state, setState] = useState(INITIAL_STATE)

  const openModal = (message = INITIAL_STATE.modalMessage) =>
    setState({ showModal: true, modalMessage: message })

  useEffect(() => {
    const { location, history } = props
    const { state: locationState } = location
    if (locationState && locationState.errorMessage) {
      openModal(locationState.errorMessage)
      // Replace the current location without a state so that this error
      // message doesn't keep getting displayed
      history.replace('/settings')
    }
  }, [props])

  const closeModal = () => setState({ ...INITIAL_STATE })

  const connectFeed = (name) => {
    const { onConnect, onOauthCodeReceived } = props

    const defaultErrorMessage = 'Could not connect feed. Please try again.'
    const openErrorModal = (message = defaultErrorMessage) => openModal(message)

    const onRequestAuthSuccess = (code) =>
      onOauthCodeReceived(name, code).catch(openErrorModal)

    onConnect(name)
      .then((url) => requestAuth(url, onRequestAuthSuccess, openErrorModal))
      .catch(openErrorModal)
  }

  const disconnectFeed = (name) =>
    props
      .onDisconnect(name)
      .then((message) => {
        if (message) {
          openModal(message)
        }
      })
      .catch(() => openModal('Could not disconnect feed. Please try again.'))

  const { feeds } = props
  const { showModal, modalMessage } = state

  const renderFeed = (feed) => (
    <FeedSettingsWrapper key={feed.name}>
      <FeedSettings
        feed={feed}
        onConnect={connectFeed}
        onDisconnect={disconnectFeed}
      />
    </FeedSettingsWrapper>
  )

  return (
    <Wrapper>
      <Feeds>
        <FeedsTitle>Feeds</FeedsTitle>
        <FeedsList>{feeds.map(renderFeed)}</FeedsList>
      </Feeds>
      <AlertModal
        isOpen={showModal}
        message={modalMessage}
        onClose={closeModal}
      />
    </Wrapper>
  )
}

Settings.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      errorMessage: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  feeds: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onConnect: PropTypes.func.isRequired,
  onDisconnect: PropTypes.func.isRequired,
  onOauthCodeReceived: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  feeds: state.feeds,
})

const mapDispatchToProps = (dispatch) => ({
  onConnect: (name) => getOauthUrl(name)(dispatch),
  onOauthCodeReceived: (name, code) => authenticateFeed(name, code)(dispatch),
  onDisconnect: (name) => disconnectFeed(name)(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
