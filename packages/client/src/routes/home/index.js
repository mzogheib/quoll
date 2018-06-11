import { connect } from 'react-redux';
import { refreshFeeds } from '../../actions';
import Home from './component';

const mapDispatchToProps = dispatch => ({
  refreshFeeds: () => dispatch(refreshFeeds()),
});

export default connect(null, mapDispatchToProps)(Home);