import { connect } from 'react-redux';
import { refreshFeeds } from '../../store/feeds';
import { setRouteTitle } from '../../store/route-title';
import Home from './component';

const mapDispatchToProps = dispatch => ({
  onMount: () => {
    dispatch(setRouteTitle('Home'));
    dispatch(refreshFeeds());
  }
});

export default connect(null, mapDispatchToProps)(Home);