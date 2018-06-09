import { connect } from 'react-redux';
import { refreshFeeds } from '../../actions';
import App from '../../components/app';

const mapDispatchToProps = dispatch => ({
  refreshFeeds: () => dispatch(refreshFeeds()),
});

export default connect(null, mapDispatchToProps)(App);