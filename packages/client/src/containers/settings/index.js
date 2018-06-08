import { connect } from 'react-redux';
import Settings from '../../components/settings';
import { setFeeds } from '../../actions';

const mapStateToProps = state => ({
  feeds: state.feeds
});

const mapDispatchToProps = dispatch => ({
  setFeeds: feeds => dispatch(setFeeds(feeds))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);