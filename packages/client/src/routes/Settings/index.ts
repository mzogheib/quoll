import { connect } from 'react-redux'
import Settings from './component'
import {
  getOauthUrl,
  authenticateFeed,
  disconnectFeed,
} from '../../store/feeds'
import { AppDispatch, RootState } from '../../store'
import { FeedName } from '../../services/feeds/types'

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
