import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import {
  getOauthUrl,
  authenticateFeed,
  disconnectFeed,
  FeedState,
  selectFeeds,
} from '../../store/feeds'
import FeedSettings from '../../components/FeedSettings'
import { requestAuth } from '../../services/oauth'
import AlertModal from '../../components/modals/AlertModal'
import { FeedName } from '../../services/feeds/types'
import { SettingsLocationState } from '../types'

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

const Settings = () => {
  const dispatch = useDispatch()

  const history = useHistory()
  const location = useLocation<SettingsLocationState>()

  const [state, setState] = useState(INITIAL_STATE)

  const feeds = Object.values(useSelector(selectFeeds))

  const onConnect = (name: FeedName) => getOauthUrl(name)(dispatch)
  const onOauthCodeReceived = (name: FeedName, code: string) =>
    authenticateFeed(name, code)(dispatch)
  const onDisconnect = (name: FeedName) => disconnectFeed(name)(dispatch)

  const openModal = (message = INITIAL_STATE.modalMessage) =>
    setState({ showModal: true, modalMessage: message })

  useEffect(() => {
    const { state: locationState } = location
    if (locationState && locationState.errorMessage) {
      openModal(locationState.errorMessage)
      // Replace the current location without a state so that this error
      // message doesn't keep getting displayed
      history.replace('/settings')
    }
  }, [history, location])

  const closeModal = () => setState({ ...INITIAL_STATE })

  const handleConnect = (name: FeedName) => {
    const defaultErrorMessage = 'Could not connect feed. Please try again.'
    const openErrorModal = (message = defaultErrorMessage) => openModal(message)

    const onRequestAuthSuccess = (code: string) =>
      onOauthCodeReceived(name, code).catch(openErrorModal)

    onConnect(name)
      .then((url) => requestAuth(url, onRequestAuthSuccess, openErrorModal))
      .catch(openErrorModal)
  }

  const handleDisconnect = (name: FeedName) =>
    onDisconnect(name)
      .then((message) => {
        if (message) {
          openModal(message)
        }
      })
      .catch(() => openModal('Could not disconnect feed. Please try again.'))

  const { showModal, modalMessage } = state

  const renderFeed = (feed: FeedState) => (
    <FeedSettingsWrapper key={feed.name}>
      <FeedSettings
        feed={feed}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
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

export default Settings