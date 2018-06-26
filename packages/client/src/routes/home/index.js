import { connect } from 'react-redux';
import { refreshFeeds } from '../../store/feeds';
import Home from './component';

const mapStateToProps = ({ feeds }) => ({
  isLoading: feeds.reduce((previous, current) => previous || current.isLoading, false)
});

const mapDispatchToProps = dispatch => ({
  onMount: () => {
    dispatch(refreshFeeds());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);