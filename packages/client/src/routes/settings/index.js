import { connect } from 'react-redux';
import Settings from './component';
import { setFeeds, getOauthUrl, authenticateFeed, disconnectFeed } from '../../store/feeds';

const mapStateToProps = state => ({
  feeds: state.feeds
});

const mapDispatchToProps = dispatch => ({
  setFeeds: feeds => dispatch(setFeeds(feeds)),
  getOauthUrl: id => dispatch(getOauthUrl(id)),
  authenticate: (id, code) => dispatch(authenticateFeed(id, code)),
  disconnect: (id, code) => dispatch(disconnectFeed(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);