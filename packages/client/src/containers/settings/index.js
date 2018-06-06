import { connect } from 'react-redux';
import Settings from '../../components/settings';
import { connectFeed, disconnectFeed } from '../../actions';

const mapStateToProps = state => ({
  feeds: state.feeds
});

const mapDispatchToProps = dispatch => ({
  connectFeed: id => dispatch(connectFeed(id)),
  disconnectFeed: id => dispatch(disconnectFeed(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);