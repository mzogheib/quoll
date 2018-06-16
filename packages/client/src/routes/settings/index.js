import { connect } from 'react-redux';
import Settings from './component';
import { getOauthUrl, authenticateFeed, disconnectFeed } from '../../store/feeds';
import { setRouteTitle } from '../../store/route-title';

const mapStateToProps = state => ({
  feeds: state.feeds
});

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(setRouteTitle('Settings')),
  onConnect: id => dispatch(getOauthUrl(id)),
  onOauthCodeReceived: (id, code) => dispatch(authenticateFeed(id, code)),
  onDisconnect: (id) => dispatch(disconnectFeed(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);