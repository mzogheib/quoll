import { connect } from 'react-redux'
import Settings from './component'
import {
  getOauthUrl,
  authenticateFeed,
  disconnectFeed,
} from '../../store/feeds'

const mapStateToProps = state => ({
  feeds: state.feeds,
})

const mapDispatchToProps = dispatch => ({
  onConnect: name => dispatch(getOauthUrl(name)),
  onOauthCodeReceived: (name, code) => dispatch(authenticateFeed(name, code)),
  onDisconnect: name => dispatch(disconnectFeed(name)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
