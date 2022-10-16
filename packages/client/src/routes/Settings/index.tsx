import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import {
  getOauthUrl,
  authenticateFeed,
  disconnectFeed,
  Feed,
} from '../../store/feeds'
import FeedSettings from '../../components/FeedSettings'
import { requestAuth } from '../../services/oauth'
import AlertModal from '../../components/modals/AlertModal'
import { AppDispatch, RootState } from '../../store'
import { FeedName } from '../../services/feeds/types'

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

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = StateProps & DispatchProps

const Settings = (props: Props) => {
  const history = useHistory()
  const location = useLocation<{ errorMessage: string }>()

  const [state, setState] = useState(INITIAL_STATE)

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

  const connectFeed = (name: FeedName) => {
    const { onConnect, onOauthCodeReceived } = props

    const defaultErrorMessage = 'Could not connect feed. Please try again.'
    const openErrorModal = (message = defaultErrorMessage) => openModal(message)

    const onRequestAuthSuccess = (code: string) =>
      onOauthCodeReceived(name, code).catch(openErrorModal)

    onConnect(name)
      .then((url) => requestAuth(url, onRequestAuthSuccess, openErrorModal))
      .catch(openErrorModal)
  }

  const disconnectFeed = (name: FeedName) =>
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

  const renderFeed = (feed: Feed) => (
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

const mapStateToProps = (state: RootState) => ({
  feeds: state.feeds,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onConnect: (name: FeedName) => getOauthUrl(name)(dispatch),
  onOauthCodeReceived: (name: FeedName, code: string) =>
    authenticateFeed(name, code)(dispatch),
  onDisconnect: (name: FeedName) => disconnectFeed(name)(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
