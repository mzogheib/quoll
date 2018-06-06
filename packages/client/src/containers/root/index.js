import { connect } from 'react-redux';
import { setConnectedFeeds } from '../../actions';
import Root from '../../components/root';

const mapDispatchToProps = dispatch => ({
  setConnectedFeeds: ids => dispatch(setConnectedFeeds(ids))
});

export default connect(null, mapDispatchToProps)(Root);
