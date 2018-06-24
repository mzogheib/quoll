import { connect } from 'react-redux';
import Settings from './component';
import { getOauthUrl, authenticateFeed, disconnectFeed } from '../../store/feeds';

const mapStateToProps = state => ({
  feeds: state.feeds
});

const mapDispatchToProps = dispatch => ({
  onConnect: id => dispatch(getOauthUrl(id)),
  onOauthCodeReceived: (id, code) => dispatch(authenticateFeed(id, code)),
  onDisconnect: (id) => dispatch(disconnectFeed(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);